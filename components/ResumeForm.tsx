'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { ResumeData, Education, Experience, Project } from '@/types/resume'
import SkillSuggestions from './SkillSuggestions'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: Partial<ResumeData>) => void
  isGenerating: boolean
}

export default function ResumeForm({ data, onChange, isGenerating }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personal')

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    }
    onChange({ education: [...data.education, newEducation] })
  }

  const removeEducation = (id: string) => {
    onChange({ education: data.education.filter(e => e.id !== id) })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      education: data.education.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      )
    })
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    }
    onChange({ experience: [...data.experience, newExp] })
  }

  const removeExperience = (id: string) => {
    onChange({ experience: data.experience.filter(e => e.id !== id) })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      experience: data.experience.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      )
    })
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    }
    onChange({ projects: [...data.projects, newProject] })
  }

  const removeProject = (id: string) => {
    onChange({ projects: data.projects.filter(p => p.id !== id) })
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      projects: data.projects.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    })
  }

  const addSkill = () => {
    const skill = prompt('Enter a skill:')
    if (skill) {
      onChange({ skills: [...data.skills, skill] })
    }
  }

  const removeSkill = (index: number) => {
    onChange({ skills: data.skills.filter((_, i) => i !== index) })
  }

  const addAchievement = () => {
    const achievement = prompt('Enter an achievement:')
    if (achievement) {
      onChange({ achievements: [...data.achievements, achievement] })
    }
  }

  const removeAchievement = (index: number) => {
    onChange({ achievements: data.achievements.filter((_, i) => i !== index) })
  }

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' }
  ]

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      {activeSection === 'personal' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={data.linkedin}
                onChange={(e) => onChange({ linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {activeSection === 'summary' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
          <textarea
            value={data.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Write a brief professional summary or let AI generate one for you..."
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            💡 Tip: Click "AI Enhance" to generate a professional summary
          </p>
        </div>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
            <button
              onClick={addEducation}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <GripVertical className="w-5 h-5 text-gray-400 mt-2" />
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Institution"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Year (e.g., 2020-2024)"
                  />
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="GPA (optional)"
                  />
                </div>
              </div>
            ))}
            {data.education.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No education added yet</p>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {activeSection === 'experience' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>
            <button
              onClick={addExperience}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <GripVertical className="w-5 h-5 text-gray-400 mt-2" />
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Duration (e.g., Jan 2022 - Present)"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            ))}
            {data.experience.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No experience added yet</p>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
            <button
              onClick={addProject}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <GripVertical className="w-5 h-5 text-gray-400 mt-2" />
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Project Name"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Project Description"
                />
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                />
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Project Link (optional)"
                />
              </div>
            ))}
            {data.projects.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No projects added yet</p>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
            <div className="flex items-center space-x-2">
              <SkillSuggestions 
                currentSkills={data.skills}
                onAddSkills={(skills) => onChange({ skills: [...data.skills, ...skills] })}
              />
              <button
                onClick={addSkill}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            {data.skills.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8 w-full">No skills added yet</p>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            💡 Tip: Use "AI Skill Suggestions" to get personalized skill recommendations
          </p>
        </div>
      )}

      {/* Achievements */}
      {activeSection === 'achievements' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
            <button
              onClick={addAchievement}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Achievement</span>
            </button>
          </div>
          <div className="space-y-2">
            {data.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <span className="text-gray-700 dark:text-gray-300 flex-1">{achievement}</span>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {data.achievements.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No achievements added yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
