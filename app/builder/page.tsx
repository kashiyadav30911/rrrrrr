'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Sparkles, Loader2, Save, Layout, BarChart3, RefreshCw } from 'lucide-react'
import ResumeForm from '@/components/ResumeForm'
import ResumePreview from '@/components/ResumePreview'
import SkillSuggestions from '@/components/SkillSuggestions'
import ModernTemplate from '@/components/templates/ModernTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate'
import ClassicProfessionalTemplate from '@/components/templates/ClassicProfessionalTemplate'
import ModernMinimalTemplate from '@/components/templates/ModernMinimalTemplate2'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'
import TechnicalTemplate from '@/components/templates/TechnicalTemplate'
import AcademicTemplate from '@/components/templates/AcademicTemplate'
import ChronologicalTemplate from '@/components/templates/ChronologicalTemplate'
import FunctionalTemplate from '@/components/templates/FunctionalTemplate'
import CombinationTemplate from '@/components/templates/CombinationTemplate'
import OnePageTemplate from '@/components/templates/OnePageTemplate'
import ModernColorBlockTemplate from '@/components/templates/ModernColorBlockTemplate'
import { ResumeData } from '@/types/resume'
import { generateAIContent } from '@/utils/aiService'
import { downloadPDF } from '@/utils/pdfExport'

type TemplateType = 'default' | 'modern' | 'minimal' | 'professional' | 'classic' | 'modern-minimal' | 'creative' | 'executive' | 'technical' | 'academic' | 'chronological' | 'functional' | 'combination' | 'one-page' | 'color-block'

const TEMPLATES = [
  { id: 'default', name: 'Default', icon: '📄', description: 'Classic ATS', component: ResumePreview },
  { id: 'modern', name: 'Modern', icon: '✨', description: 'Gradient Header', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', icon: '📋', description: 'Clean & Simple', component: MinimalTemplate },
  { id: 'professional', name: 'Professional', icon: '💼', description: 'Two Column', component: ProfessionalTemplate },
  { id: 'classic', name: 'Classic Professional', icon: '📄', description: 'Traditional', component: ClassicProfessionalTemplate },
  { id: 'modern-minimal', name: 'Modern Minimal', icon: '✨', description: 'Blue Accent', component: ModernMinimalTemplate },
  { id: 'creative', name: 'Creative', icon: '🎨', description: 'Gradient Style', component: CreativeTemplate },
  { id: 'executive', name: 'Executive', icon: '👔', description: 'Dark Premium', component: ExecutiveTemplate },
  { id: 'technical', name: 'Technical', icon: '💻', description: 'Dev Focused', component: TechnicalTemplate },
  { id: 'academic', name: 'Academic', icon: '📚', description: 'Scholarly', component: AcademicTemplate },
  { id: 'chronological', name: 'Chronological', icon: '📅', description: 'Timeline', component: ChronologicalTemplate },
  { id: 'functional', name: 'Functional', icon: '⚙️', description: 'Skills First', component: FunctionalTemplate },
  { id: 'combination', name: 'Combination', icon: '🔀', description: 'Hybrid', component: CombinationTemplate },
  { id: 'one-page', name: 'One-Page', icon: '📋', description: 'Compact', component: OnePageTemplate },
  { id: 'color-block', name: 'Color Block', icon: '🎯', description: 'Modern Visual', component: ModernColorBlockTemplate },
]

export default function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    education: [],
    skills: [],
    experience: [],
    projects: [],
    achievements: []
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [aiParseError, setAiParseError] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('default')
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  const handleInputChange = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }))
  }

  const handleAddSkills = (skills: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ...skills]
    }))
  }

  const handleGenerateAI = async () => {
    setAiParseError(null)
    setIsGenerating(true)
    try {
      const enhancedData = await generateAIContent(resumeData)
      setResumeData(enhancedData)
      alert('✨ Resume enhanced successfully with AI!')
    } catch (error: any) {
      console.error('AI generation error:', error)

      const isParseError = error?.message?.includes('Failed to parse AI response')
      if (isParseError) {
        setAiParseError(error.message)
        return
      }

      alert(error.message || 'Failed to generate AI content. Please check your API key in .env.local file.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPDF = () => {
    downloadPDF(resumeData)
  }

  const handleSaveLocal = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
    alert('💾 Resume saved locally!')
  }

  const renderTemplate = () => {
    const template = TEMPLATES.find(t => t.id === selectedTemplate)
    if (!template) return <ResumePreview data={resumeData} />
    const TemplateComponent = template.component as any
    return <TemplateComponent data={resumeData} />
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 dark:text-gray-300">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">Resume Builder</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Layout className="w-4 h-4" />
                  <span className="hidden sm:inline">Templates</span>
                </button>
                <button
                  onClick={handleSaveLocal}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">AI Enhance</span>
                    </>
                  )}
                </button>

                {aiParseError && (
                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    title={aiParseError}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Retry</span>
                  </button>
                )}

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Template Selector */}
          {showTemplateSelector && (
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Template</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto pb-4">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id as TemplateType)
                      setShowTemplateSelector(false)
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{template.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6">
              <ResumeForm 
                data={resumeData} 
                onChange={handleInputChange}
                isGenerating={isGenerating}
              />
            </div>

            {/* Right: Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="mb-4 text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Template: <span className="font-semibold capitalize">{selectedTemplate}</span>
                </span>
              </div>
              {renderTemplate()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
