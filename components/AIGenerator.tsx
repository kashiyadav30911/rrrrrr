'use client'

import { useState } from 'react'
import { Sparkles, AlertCircle, CheckCircle, Copy } from 'lucide-react'

interface AIGeneratorProps {
  type: 'summary' | 'experience' | 'skills' | 'project'
  prompt: string
  onGenerate: (content: string) => void
  disabled?: boolean
  label?: string
}

export default function AIGenerator({
  type,
  prompt,
  onGenerate,
  disabled = false,
  label = 'Generate with AI'
}: AIGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setGeneratedContent(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          type
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to generate content (${response.status})`)
      }

      if (!data.success || !data.data) {
        throw new Error('No content generated from API')
      }

      setGeneratedContent(data.data)
      setSuccess(true)
      onGenerate(data.data)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Generation error:', err)

      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleGenerate}
        disabled={disabled || isLoading}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isLoading ? 'Generating...' : label}</span>
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg">
          <div className="animate-spin">⏳</div>
          <span className="text-sm">Generating content with Gemini 2.0 Flash...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Error generating content</p>
            <p className="text-xs mt-1 opacity-75">{error}</p>
          </div>
        </div>
      )}

      {/* Success State */}
      {success && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Content generated successfully!</span>
        </div>
      )}

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Generated Content:</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {generatedContent}
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 flex items-center space-x-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <Copy className="w-3 h-3" />
            <span>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
