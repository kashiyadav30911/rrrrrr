'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, TrendingUp, CheckCircle, AlertCircle, Sparkles, Download, Edit, Trash2, Plus } from 'lucide-react'
import { ResumeData, ResumeScore } from '@/types/resume'
import { calculateResumeScore } from '@/utils/aiService'

export default function Dashboard() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [score, setScore] = useState<ResumeScore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load resume from localStorage
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      const data = JSON.parse(saved)
      setResumeData(data)
      
      // Calculate score
      calculateResumeScore(data).then(scoreData => {
        setScore(scoreData)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const getCompletionPercentage = () => {
    if (!resumeData) return 0
    
    let completed = 0
    let total = 7
    
    if (resumeData.fullName) completed++
    if (resumeData.email) completed++
    if (resumeData.summary && resumeData.summary.length > 50) completed++
    if (resumeData.education.length > 0) completed++
    if (resumeData.skills.length >= 5) completed++
    if (resumeData.experience.length > 0) completed++
    if (resumeData.projects.length > 0) completed++
    
    return Math.round((completed / total) * 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-100'
    if (score >= 70) return 'bg-blue-100'
    if (score >= 50) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Resume Found</h2>
          <p className="text-gray-600 mb-8">Start building your professional resume to see your dashboard analytics.</p>
          <Link 
            href="/builder"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Resume</span>
          </Link>
        </div>
      </div>
    )
  }

  const completion = getCompletionPercentage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <Link 
              href="/builder"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Resume</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {resumeData.fullName || 'User'}!
          </h2>
          <p className="text-gray-600">Here's your resume performance overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Completion Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{completion}%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Completion</h3>
            <p className="text-sm text-gray-600">Profile completeness</p>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>

          {/* Resume Score Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${score ? getScoreBgColor(score.overall) : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                <TrendingUp className={`w-6 h-6 ${score ? getScoreColor(score.overall) : 'text-gray-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${score ? getScoreColor(score.overall) : 'text-gray-600'}`}>
                {score?.overall || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Resume Score</h3>
            <p className="text-sm text-gray-600">Out of 100</p>
          </div>

          {/* Sections Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {(resumeData.experience.length || 0) + (resumeData.projects.length || 0)}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Entries</h3>
            <p className="text-sm text-gray-600">Experience & Projects</p>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{resumeData.skills.length}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Skills</h3>
            <p className="text-sm text-gray-600">Listed skills</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Score Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Scores */}
            {score && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Section Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(score.sections).map(([section, value]) => (
                    <div key={section}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700 capitalize">{section}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}/20</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(value / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {score && score.suggestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Improvement Suggestions</h3>
                <div className="space-y-3">
                  {score.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            {score && score.keywords.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Detected Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {score.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  These keywords help your resume pass ATS (Applicant Tracking Systems)
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Missing Fields */}
            {score && score.missingFields.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">Missing Sections</h3>
                <div className="space-y-2">
                  {score.missingFields.map((field, index) => (
                    <div key={index} className="flex items-center space-x-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{field}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/builder"
                  className="mt-4 block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold"
                >
                  Complete Profile
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/builder"
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Edit Resume</span>
                </Link>
                <Link 
                  href="/templates"
                  className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Change Template</span>
                </Link>
                <Link 
                  href="/job-tracker"
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Track Applications</span>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <Sparkles className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-blue-100">
                Resumes with quantifiable achievements get 40% more interview calls. Add numbers and metrics to your experience!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
