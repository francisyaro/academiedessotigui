import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn(
      '[SUPABASE] Clés manquantes (Admin). Retour d\'un client Supabase simulé.'
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

  return createSupabaseClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}
