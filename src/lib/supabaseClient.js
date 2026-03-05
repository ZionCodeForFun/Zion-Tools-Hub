import { createClient } from "@supabase/supabase-js";

// Supabase client initialized with environment variables
// Make sure VITE_SUPERBASE_URL and VITE_SUPERBASE_ANON_KEY are defined in .env
export const supabase = createClient(
  import.meta.env.VITE_SUPERBASE_URL,
  import.meta.env.VITE_SUPERBASE_ANON_KEY,
);
