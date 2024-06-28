<script lang="ts">
    import { signInWithEmailMagicLink, signOut, supabase } from "$lib/supabase";
    import { type UserResponse } from "@supabase/supabase-js";
    import { Alert, Badge, Button, Input, Modal } from "@svelteuidev/core";
    import { Enter, EnvelopeClosed, Exit } from "radix-icons-svelte";
    import { page } from "$app/stores";

    let user: UserResponse | null = null;
    supabase.auth.getUser().then((userData) => {
        user = userData;
    });

    let showSignInModal = false,
        showSignOutModal = false,
        signInEmail = "",
        alertSignIn = false,
        alertSignOut = false,
        alertRateLimited = false;
</script>

<!-- Main Auth Content - Sign In and Out -->

{#if user && user.data.user}
    <div id="auth-control">
        <Badge size="xl" color="blue"
            >{user.data.user.email?.toLowerCase()}</Badge
        >
        <Button
            on:click={() => {
                showSignOutModal = true;
            }}
            variant="outline"
        >
            <Exit slot="leftIcon" />
            Sign Out
        </Button>
    </div>
{:else if user}
    <div id="auth-control">
        <Button
            on:click={() => {
                showSignInModal = true;
            }}
            variant="outline"
        >
            <Enter slot="leftIcon" />
            Sign In
        </Button>
    </div>
{/if}

<!-- Sign In Confirmation Message for user coming from Confirmation Link -->
{#if $page.url.searchParams.get("magiclink") === "true"}
    <Alert
        override={{ marginBottom: "10px" }}
        icon={Enter}
        title="You're Signed In!"
        color="green"
    >
        You have successfully signed in! Syncing will take place automatically
        with your account. Have fun!
    </Alert>
{/if}

<!-- Modal for Sign In -->
<Modal
    opened={showSignInModal}
    on:close={() => (showSignInModal = false)}
    title="Sign In"
>
    <p>
        To sign in, enter your email and click "Send Email". Click on the link
        in the email to sign in.
    </p>
    <br />
    <p>Email:</p>
    <Input placeholder="Email" bind:value={signInEmail} />

    <Button
        override={{ marginTop: "1rem" }}
        color="green"
        fullSize
        on:click={() => {
            signInWithEmailMagicLink(signInEmail)
                .then(() => {
                    alertSignIn = true;
                    setTimeout(() => {
                        alertSignIn = false;
                    }, 5000);
                })
                .catch(() => {
                    // assume that you are rate limited for now
                    alertRateLimited = true;
                    setTimeout(() => {
                        alertRateLimited = false;
                    }, 5000);
                });
            showSignInModal = false;
        }}
    >
        Send Email
    </Button>
</Modal>

<!-- Alert to tell user to check email -->
{#if alertSignIn}
    <Alert
        override={{ marginBottom: "10px" }}
        icon={EnvelopeClosed}
        title="Check your email!"
        color="green"
    >
        We have sent the email! Please check your email for the link and
        remember to check your spam folder too.
    </Alert>
{/if}

<!-- Alert to tell user to check email -->
{#if alertRateLimited}
    <Alert
        override={{ marginBottom: "10px" }}
        icon={EnvelopeClosed}
        title="Sorry, please try again later."
        color="red"
    >
        Due to rate limits, the email has not been sent. Please try again later.
    </Alert>
{/if}

<!-- Modal for Sign Out -->
<Modal
    opened={showSignOutModal}
    on:close={() => (showSignOutModal = false)}
    title="Sign In"
>
    <p>
        Are you sure you want to sign out? You will retain the countdowns but it
        will not be synced.
    </p>

    <Button
        override={{ marginTop: "1rem" }}
        color="orange"
        fullSize
        on:click={() => {
            signOut().then(() => {
                showSignOutModal = false;

                // configure alert to show for 5 seconds
                alertSignOut = true;
                setTimeout(() => {
                    alertSignOut = false;
                }, 5000);

                // reset user
                supabase.auth.getUser().then((userData) => {
                    user = userData;
                });
            });
        }}
    >
        Sign Out
    </Button>
</Modal>

<!-- Alert to tell user to check email -->
{#if alertSignOut}
    <Alert
        override={{ marginBottom: "10px" }}
        icon={Exit}
        title="You're Signed Out!"
        color="green">Hooray?</Alert
    >
{/if}

<style>
    #auth-control {
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 1rem;
        margin-bottom: 10px;
    }
</style>
