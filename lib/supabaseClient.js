import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function hasSupabaseConfig() {
  return Boolean(getSupabaseConfig());
}

export function getSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(config.url, config.key, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }

  return supabaseClient;
}