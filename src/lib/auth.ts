import { supabase } from "./supabase";

export async function signInWithEmailMagicLink(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: window.location.origin + "?magiclink=true",
        },
    });
    if (error) throw error;
}

export async function signOut() {
    await supabase.auth.signOut();
}
