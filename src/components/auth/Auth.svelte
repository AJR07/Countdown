<script lang="ts">
    import { signInWithEmailMagicLink, supabase } from "$lib/supabase";
    import { UserResponse } from "@supabase/supabase-js";
    import { Badge, Button } from "@svelteuidev/core";
    import { Enter, Exit } from "radix-icons-svelte";

    let user: null | UserResponse = null;
    supabase.auth.getUser().then((user) => {
        user = user;
    });

    function signOut() {
        supabase.auth.signOut();
        user = null;
    }
</script>

{#if user}
    <div id="auth-control">
        <Badge color="success">{user.data.user?.email}</Badge>
        <Button on:click={signOut}>
            <Exit />
            Sign Out
        </Button>
    </div>
{:else}
    <div id="auth-control">
        <Button on:click={signInWithEmailMagicLink}>
            <Enter />
            Sign In
        </Button>
    </div>
{/if}
