'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Plus, X } from 'lucide-react'
import { suggestSkillsByRole } from '@/utils/aiService'

interface SkillSuggestionsProps {
  currentSkills: string[]
  onAddSkills: (skills: string[]) => void
}

export default function SkillSuggestions({ currentSkills, onAddSkills }: SkillSuggestionsProps) {
  const [jobRole, setJobRole] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handleGenerateSuggestions = async () => {
    if (!jobRole.trim()) {
      alert('Please enter a job role')
      return
    }

    setLoading(true)
    try {
      const skills = await suggestSkillsByRole(jobRole)
      // Filter out skills already in resume
      const newSkills = skills.filter(skill => 
        !currentSkills.some(existing => 
          existing.toLowerCase() === skill.toLowerCase()
        )
      )
      setSuggestions(newSkills)
      setSelectedSkills([])
    } catch (error: any) {
      alert(error.message || 'Failed to generate skill suggestions')
    } finally {
      setLoading(false)
    }
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleAddSelected = () => {
    if (selectedSkills.length > 0) {
      onAddSkills(selectedSkills)
      setSuggestions([])
      setSelectedSkills([])
      setJobRole('')
      setShowModal(false)
      alert(`✅ Added ${selectedSkills.length} skills to your resume!`)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-semibold"
      >
        <Sparkles className="w-4 h-4" />
        <span>AI Skill Suggestions</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Skill Suggestions</h2>
                <p className="text-sm text-gray-600 mt-1">Get personalized skill recommendations for your target role</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Input Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What job role are you targeting?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateSuggestions()}
                    placeholder="e.g., Frontend Developer, Data Analyst, Product Manager"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleGenerateSuggestions}
                    disabled={loading || !jobRole.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Generate'
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Be specific with your job role for better suggestions
                </p>
              </div>

              {/* Quick Role Buttons */}
              {!suggestions.length && !loading && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Popular roles:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Frontend Developer',
                      'Backend Developer',
                      'Full Stack Developer',
                      'Data Analyst',
                      'DevOps Engineer',
                      'Product Manager',
                      'UI/UX Designer',
                      'Data Scientist'
                    ].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setJobRole(role)
                          setTimeout(() => handleGenerateSuggestions(), 100)
                        }}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors text-sm"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Generating skill suggestions...</p>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && !loading && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Suggested Skills for {jobRole}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {selectedSkills.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {suggestions.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          selectedSkills.includes(skill)
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{skill}</span>
                          {selectedSkills.includes(skill) && (
                            <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                              <Plus className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSuggestions([])
                        setSelectedSkills([])
                        setJobRole('')
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Try Another Role
                    </button>
                    <button
                      onClick={handleAddSelected}
                      disabled={selectedSkills.length === 0}
                      className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add {selectedSkills.length} Skills</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!suggestions.length && !loading && jobRole && (
                <div className="text-center py-8 text-gray-500">
                  <p>No suggestions yet. Click "Generate" to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
