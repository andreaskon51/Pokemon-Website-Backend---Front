import { createClient } from '@supabase/supabase-js'
import { config } from '../config.js'

export const supabase = createClient(config.supabase.url, config.supabase.anonKey)

export async function syncUserToSupabaseAuth(
  email: string,
  password: string,
  username: string
): Promise<void> {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // stored as user_metadata in Supabase Auth
      },
    })

    if (error) {
      console.warn('[SUPABASE] Failed to sync user to Supabase Auth:', error.message)
    } else {
      console.log(`[SUPABASE] User ${email} synced to Supabase Auth`)
    }
  } catch (err) {
    console.warn('[SUPABASE] Error syncing user:', err)
  }
}
