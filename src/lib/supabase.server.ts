import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Node20WebSocketFallback {
  constructor() {}
  addEventListener() {}
  removeEventListener() {}
  send() {}
  close() {}
}

let cachedClient: SupabaseClient | null = null;
let cachedServiceRoleClient: SupabaseClient | null = null;

function createServerClient(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: Node20WebSocketFallback as any,
    },
  });
}

export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createServerClient(url, key);
    } catch (err) {
      console.error("Erreur initialisation Supabase Client :", err);
      return null;
    }
  }

  return cachedClient;
}

export function getSupabaseServiceRoleClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !serviceRoleKey) return null;
  if (!cachedServiceRoleClient) {
    try {
      cachedServiceRoleClient = createServerClient(url, serviceRoleKey);
    } catch (error) {
      console.error("Erreur initialisation client Supabase service_role :", error);
      return null;
    }
  }
  return cachedServiceRoleClient;
}
