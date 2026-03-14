import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  console.log(`[API /api/generate][${requestId}] Incoming request`)
  console.log(`[API /api/generate][${requestId}] OpenRouter key configured:`, !!OPENROUTER_API_KEY)
  console.log(`[API /api/generate][${requestId}] OpenAI key configured:`, !!OPENAI_API_KEY)

  try {
    const body = await request.json()
    const { prompt } = body

    console.log(`[API /api/generate][${requestId}] Prompt length:`, typeof prompt === 'string' ? prompt.length : 'invalid')

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      console.error(`[API /api/generate][${requestId}] Invalid prompt payload`)
      return NextResponse.json(
        { error: 'Prompt is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    const openrouterKey = OPENROUTER_API_KEY?.trim()
    const openaiKey = OPENAI_API_KEY?.trim()
    const key = openrouterKey || openaiKey

    if (!key || key.length < 20 || key.startsWith('your_')) {
      console.error(`[API /api/generate][${requestId}] API key not configured or placeholder value detected`)
      return NextResponse.json(
        {
          error: 'API key not configured. Please add a valid OPENROUTER_API_KEY or OPENAI_API_KEY to your environment variables.',
          suggestion: 'Set the key in Vercel project settings and redeploy.'
        },
        { status: 500 }
      )
    }

    let response
    if (openrouterKey) {
      console.log(`[API /api/generate][${requestId}] Provider selected: OpenRouter`)
      response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'meta-llama/llama-3.1-8b-instruct',
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            Authorization: `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } else {
      console.log(`[API /api/generate][${requestId}] Provider selected: OpenAI`)
      response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1024
        },
        {
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const text = response.data?.choices?.[0]?.message?.content || response.data?.choices?.[0]?.text

    if (!text) {
      console.error(`[API /api/generate][${requestId}] AI response missing content`, response.data)
      return NextResponse.json(
        { error: 'No content generated. Please try again.' },
        { status: 500 }
      )
    }

    console.log(`[API /api/generate][${requestId}] Generation successful`)
    return NextResponse.json({ text }, { status: 200 })
  } catch (error: any) {
    console.error(`[API /api/generate][${requestId}] Upstream API error`, {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data
    })

    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      'AI generation failed.'

    return NextResponse.json(
      { error: message },
      { status: error?.response?.status || 500 }
    )
  }
}

export async function GET() {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  console.log('[API /api/generate][health] Health check requested')

  return NextResponse.json(
    {
      status: 'API Ready',
      provider: OPENROUTER_API_KEY ? 'OpenRouter' : OPENAI_API_KEY ? 'OpenAI' : 'Not configured',
      model: OPENROUTER_API_KEY ? 'meta-llama/llama-3.1-8b-instruct' : OPENAI_API_KEY ? 'gpt-4o-mini' : 'N/A',
      apiKeyConfigured: !!OPENROUTER_API_KEY || !!OPENAI_API_KEY,
      hasOpenRouterKey: !!OPENROUTER_API_KEY,
      hasOpenAIKey: !!OPENAI_API_KEY,
      version: '1.0.0',
      endpoints: {
        post: '/api/generate (POST) - Generate content with prompt'
      }
    },
    { status: 200 }
  )
}
