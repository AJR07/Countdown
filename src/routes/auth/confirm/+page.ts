import { browser } from "$app/environment";
import { verifyMagicLinkOTP } from "$lib/supabase.js";
import State from "../../../types/state.js";

export async function load({ url }): Promise<{
    state: State;
    error: string | null;
}> {
    if (browser) {
        let tokenHash = url.searchParams.get("tokenHash")!,
            type = url.searchParams.get("type")!;

        let err = await verifyMagicLinkOTP(tokenHash, type);

        return {
            state: err ? State.Error : State.Success,
            error: `${err}`,
        };
    }
    return {
        state: State.Error,
        error: "Invalid authentication request.",
    };
}
