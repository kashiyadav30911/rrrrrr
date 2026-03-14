'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function AcademicTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-12 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-serif font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-gray-600 text-sm mt-4 space-y-1 flex flex-col items-center">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.linkedin && <div>ORCID: {data.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-gray-900 font-bold text-sm mb-3 tracking-wide">SUMMARY</h2>
          <p className="text-gray-700 text-sm">{data.summary}</p>
        </div>
      )}

      {/* Experience/Position */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gray-900 font-bold text-sm mb-3 tracking-wide">ACADEMIC POSITIONS</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills/Competencies */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gray-900 font-bold text-sm mb-3 tracking-wide">RESEARCH AREAS</h2>
          <ul className="text-gray-700 text-sm space-y-1">
            {data.skills.map((skill, idx) => (
              <li key={idx}>• {skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-gray-900 font-bold text-sm mb-3 tracking-wide">EDUCATION</h2>
          <div className="text-gray-700 text-sm space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <span className="font-bold">{edu.degree}</span> - {edu.institution}, {edu.year}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
