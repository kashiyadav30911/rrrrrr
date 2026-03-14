#!/usr/bin/env node

/**
 * Deployment verification script.
 * Usage:
 *   node scripts/verify-deployment.mjs https://your-app.vercel.app
 */

const baseArg = process.argv[2]

if (!baseArg) {
  console.error('[verify-deployment] Missing deployment URL argument')
  process.exit(1)
}

const baseUrl = baseArg.replace(/\/$/, '')
const endpoint = `${baseUrl}/api/generate`

async function main() {
  console.log('[verify-deployment] Checking endpoint:', endpoint)

  const healthResponse = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  if (!healthResponse.ok) {
    console.error('[verify-deployment] Health check failed with status', healthResponse.status)
    process.exit(1)
  }

  const healthPayload = await healthResponse.json()
  console.log('[verify-deployment] Health payload:', healthPayload)

  if (healthPayload.status !== 'API Ready') {
    console.error('[verify-deployment] Unexpected health status value:', healthPayload.status)
    process.exit(1)
  }

  if (!healthPayload.apiKeyConfigured) {
    console.error('[verify-deployment] API key is not configured in deployment environment')
    process.exit(1)
  }

  const smokePrompt = process.env.DEPLOY_SMOKE_PROMPT || 'Reply with exactly: OK'

  const postResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ prompt: smokePrompt })
  })

  const postPayload = await postResponse.json().catch(() => ({}))

  if (!postResponse.ok) {
    console.error('[verify-deployment] POST smoke test failed:', {
      status: postResponse.status,
      payload: postPayload
    })
    process.exit(1)
  }

  if (typeof postPayload.text !== 'string' || postPayload.text.trim().length === 0) {
    console.error('[verify-deployment] Invalid POST response payload:', postPayload)
    process.exit(1)
  }

  console.log('[verify-deployment] POST smoke test passed')
  console.log('[verify-deployment] Deployment verification complete')
}

main().catch((error) => {
  console.error('[verify-deployment] Unexpected failure:', error)
  process.exit(1)
})
