<script lang="ts">
    import { verifyMagicLinkOTP } from "$lib/supabase";
    import State from "../../../types/state";

    const urlParams = new URLSearchParams(window.location.search);
    const tokenHash = urlParams.get("token_hash"),
        type = urlParams.get("type");
    $: state = State.Idle;

    if (!tokenHash || !type) {
        window.location.href = "/";
    } else {
        verifyMagicLinkOTP(tokenHash, type).then((error) => {
            if (error) {
                state = State.Error;
            } else {
                state = State.Success;
            }
        });
    }
</script>
