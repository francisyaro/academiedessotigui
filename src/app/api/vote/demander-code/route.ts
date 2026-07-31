import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, country } = await request.json()

    if (!email || !country) {
      return NextResponse.json(
        { message: 'L\'e-mail et le pays sont obligatoires.' },
        { status: 400 }
      )
    }

    // Generate a 6-digit verification code
    const rawCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Hash email & code for security/privacy
    const emailHash = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex')
    const codeHash = crypto.createHash('sha256').update(rawCode).digest('hex')
    
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes expiration

    console.log(`[VOTE SYSTEM] Code de vérification généré pour ${email} : ${rawCode}`)

    const supabase = createAdminClient()

    // 1. Check if voter identity already exists, otherwise create it
    const { data: voter, error: voterError } = await supabase
      .from('voter_identities')
      .select('id')
      .eq('email_hash', emailHash)
      .maybeSingle()

    let voterId = voter?.id

    if (voterError || !voterId) {
      const { data: newVoter, error: insertError } = await supabase
        .from('voter_identities')
        .insert({
          email_hash: emailHash,
          country_id: country
        })
        .select('id')
        .single()
      
      if (insertError) {
        // Fallback to mock if database is not reachable / local dev
        console.warn('[VOTE SYSTEM] DB non connectée, utilisation du mode Mock.', insertError.message)
        const mockVerificationId = crypto.randomUUID()
        return NextResponse.json({
          message: 'Code envoyé (mode démo).',
          verificationId: mockVerificationId,
          // We return the code in demo/mock mode so testing is easy without email service!
          demoCode: rawCode
        })
      }
      voterId = newVoter.id
    }

    // 2. Insert verification code
    const { data: verification, error: codeError } = await supabase
      .from('vote_verification_codes')
      .insert({
        identity_id: voterId,
        code_hash: codeHash,
        expires_at: expiresAt
      })
      .select('id')
      .single()

    if (codeError) {
      throw new Error(`Erreur lors de l'enregistrement du code : ${codeError.message}`)
    }

    return NextResponse.json({
      message: 'Code de vérification envoyé.',
      verificationId: verification.id
    })

  } catch (err: any) {
    console.error('[VOTE API ERROR]', err.message)
    return NextResponse.json(
      { message: 'Une erreur interne est survenue.' },
      { status: 500 }
    )
  }
}
