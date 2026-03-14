'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function OnePageTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-10 shadow-lg text-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-indigo-600">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        </div>
        <div className="text-right text-xs text-gray-600">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-4">
          <p className="text-gray-700 text-xs leading-tight">{data.summary}</p>
        </div>
      )}

      {/* Experience - Combined */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-indigo-600 font-bold mb-2 text-xs uppercase">EXPERIENCE</h2>
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-xs">{exp.title} • {exp.company}</span>
                  <span className="text-xs text-gray-600">{exp.duration}</span>
                </div>
                <span className="text-xs text-gray-700">{exp.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills - Compact */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-indigo-600 font-bold mb-1 text-xs uppercase">SKILLS</h2>
          <span className="text-xs text-gray-700">{data.skills.join(' • ')}</span>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-indigo-600 font-bold mb-1 text-xs uppercase">EDUCATION</h2>
          <div className="space-y-1">
            {data.education.map((edu) => (
              <span key={edu.id} className="text-xs text-gray-700">
                {edu.degree} • {edu.institution} • {edu.year}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
