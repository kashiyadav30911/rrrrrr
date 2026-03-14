'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function FunctionalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-12 shadow-lg">
      {/* Header */}
      <div className="mb-8 bg-orange-50 p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-gray-600 text-sm mt-3 flex flex-wrap gap-3">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•{data.phone}</span>}
          {data.linkedin && <span>• {data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-orange-600 font-bold mb-4 border-b-2 border-orange-600 pb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 text-sm">{data.summary}</p>
        </div>
      )}

      {/* Core Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-orange-600 font-bold mb-4 border-b-2 border-orange-600 pb-2">CORE COMPETENCIES</h2>
          <ul className="text-gray-700 text-sm space-y-2">
            {data.skills.map((skill, idx) => (
              <li key={idx}>• {skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-orange-600 font-bold mb-4 border-b-2 border-orange-600 pb-2">PROFESSIONAL EXPERIENCE</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-orange-600 text-sm">{exp.company}</p>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-orange-600 font-bold mb-3 border-b-2 border-orange-600 pb-2">EDUCATION</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
