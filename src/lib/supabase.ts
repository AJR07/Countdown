import { createClient } from "@supabase/supabase-js";

// Get Anon Key from Dotenv
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
