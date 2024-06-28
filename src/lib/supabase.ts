import { createClient } from "@supabase/supabase-js";

// Get Anon Key from Dotenv
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    "https://bbwzezdaeqapoeyiuoyo.supabase.co",
    SUPABASE_ANON_KEY
);

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
