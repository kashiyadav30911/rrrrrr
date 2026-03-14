'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function ClassicProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-12 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-900">
        <h1 className="text-4xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        <div className="flex justify-center gap-6 text-sm text-gray-600 mt-2 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-gray-600 text-sm">{exp.duration}</span>
                </div>
                <p className="text-gray-600 font-semibold">{exp.company}</p>
                <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">SKILLS</h2>
          <p className="text-gray-700 text-sm">{data.skills.join(', ')}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">EDUCATION</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <span className="text-gray-600 text-sm">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
