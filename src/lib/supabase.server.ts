import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Node20WebSocketFallback {
  constructor() {}
  addEventListener() {}
  removeEventListener() {}
  send() {}
  close() {}
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        realtime: {
          transport: Node20WebSocketFallback as any,
        },
      });
    } catch (err) {
      console.error("Erreur initialisation Supabase Client :", err);
      return null;
    }
  }

  return cachedClient;
}
