import { createClient } from "@supabase/supabase-js";

// ensure environment variables are available (restart dev server if you just added them)
const SUPABASE_URL = import.meta.env.VITE_SUPERBASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPERBASE_ANON_KEY;

if (!SUPABASE_URL) {
  console.error("VITE_SUPERBASE_URL is undefined. Check your .env file and restart the dev server.");
}
if (!SUPABASE_ANON_KEY) {
  console.error("VITE_SUPERBASE_ANON_KEY is undefined. Check your .env file and restart the dev server.");
}

export const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || ""
);
