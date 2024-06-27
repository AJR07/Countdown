import {
    EmailOtpType,
    MobileOtpType,
    createClient,
} from "@supabase/supabase-js";

// Get Anon Key from Dotenv
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://bbwzezdaeqapoeyiuoyo.supabase.co",
    SUPABASE_ANON_KEY
);

export default async function signInWithEmailMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: window.location.href,
        },
    });
    if (error) throw error;
    return data;
}

export async function verifyMagicLinkOTP(token_hash: string, type: string) {
    if (type !== "magiclink") return "Invalid OTP type";

    const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: "magiclink",
    });
    return error;
}
