import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';
export const SUPABASE_URL = 'https://xmqdfvlsyckqbyeqagig.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_erDA1eWWsk0Di2MgybvOLg_ruxjLxpc';
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
});
