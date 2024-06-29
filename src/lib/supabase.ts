import { createClient } from "@supabase/supabase-js";

// Get Anon Key from Dotenv
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    "https://bbwzezdaeqapoeyiuoyo.supabase.co",
    SUPABASE_ANON_KEY
);
