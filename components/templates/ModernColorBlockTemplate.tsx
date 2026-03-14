'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function ModernColorBlockTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Color Block Header */}
      <div className="grid grid-cols-4 h-32">
        <div className="bg-red-500"></div>
        <div className="bg-blue-500"></div>
        <div className="bg-green-500"></div>
        <div className="bg-yellow-500"></div>
      </div>

      {/* Content */}
      <div className="p-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.fullName || 'YOUR NAME'}</h1>
        <div className="flex gap-6 text-sm text-gray-600 mb-8 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>

        {/* Professional Overview */}
        {data.summary && (
          <div className="mb-8 pb-6 border-b border-gray-300">
            <h2 className="font-bold text-gray-900 mb-3">PROFESSIONAL OVERVIEW</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Core Competencies - Color Coded */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8 grid grid-cols-2 gap-6">
            {data.skills.slice(0, 4).map((skill, idx) => {
              const colors = ['red', 'blue', 'green', 'yellow']
              const color = colors[idx % colors.length]
              return (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className={`w-3 h-3 bg-${color}-500`}></span>
                    {skill}
                  </h3>
                </div>
              )
            })}
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-gray-900 mb-3">EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{exp.company} | {exp.duration}</p>
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-2">EDUCATION</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-gray-700 text-sm">{edu.degree} • {edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
