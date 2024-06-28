<script lang="ts">
    import { signInWithEmailMagicLink, supabase } from "$lib/supabase";
    import { type UserResponse } from "@supabase/supabase-js";
    import { Alert, Badge, Button, Input, Modal } from "@svelteuidev/core";
    import { Enter, EnvelopeClosed, Exit } from "radix-icons-svelte";

    let user: null | UserResponse = null;
    supabase.auth.getUser().then((userData) => {
        user = userData;
    });

    let showSignInModal = false,
        showSignOutModal = false,
        signInEmail = "",
        alertSignIn = false,
        alertSignOut = false;
</script>

{#if user && user.data.user}
    <div id="auth-control">
        <Badge color="success">{user.data.user?.email}</Badge>
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
{:else}
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
            signInWithEmailMagicLink(signInEmail);
            showSignInModal = false;

            // configure alert to show for 5 seconds
            alertSignIn = true;
            setTimeout(() => {
                alertSignIn = false;
            }, 5000);
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
        color="green"
        fullSize
        on:click={() => {
            showSignOutModal = false;

            // configure alert to show for 5 seconds
            alertSignOut = true;
            setTimeout(() => {
                alertSignOut = false;
            }, 5000);
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
        title="You're Signed OUt!"
        color="green"
    />
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
