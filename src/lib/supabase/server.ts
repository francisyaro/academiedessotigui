import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[SUPABASE] Clés manquantes (Server). Retour d\'un client Supabase simulé.'
    )
    const dummyPromise = Promise.resolve({ data: null, error: { message: 'Database not connected' } })
    const dummyChain: any = {
      select: () => dummyChain,
      insert: () => dummyChain,
      update: () => dummyChain,
      delete: () => dummyChain,
      eq: () => dummyChain,
      limit: () => dummyChain,
      maybeSingle: () => dummyPromise,
      single: () => dummyPromise,
      then: (cb: any) => dummyPromise.then(cb),
      catch: (cb: any) => dummyPromise.catch(cb)
    }

    return {
      from: () => dummyChain,
      rpc: () => dummyPromise,
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    } as any
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
