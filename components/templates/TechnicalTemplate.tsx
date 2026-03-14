'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function TechnicalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-10 shadow-lg font-mono text-sm">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-400">
        <h1 className="text-3xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-gray-700 space-y-1 mt-3 flex flex-col items-center">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-blue-700 font-bold mb-2">▶ SUMMARY</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-blue-700 font-bold mb-2">▶ TECHNICAL STACK</h2>
          <div className="text-gray-700 space-y-1">
            {data.skills.map((skill, idx) => (
              <div key={idx}>• {skill}</div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-blue-700 font-bold mb-2">▶ PROFESSIONAL EXPERIENCE</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-gray-700">
                <div className="font-bold">{exp.title} @ {exp.company} ({exp.duration})</div>
                <div className="ml-2">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-blue-700 font-bold mb-2">▶ EDUCATION</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-gray-700">
                <div className="font-bold">{edu.degree} ({edu.year})</div>
                <div>{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
