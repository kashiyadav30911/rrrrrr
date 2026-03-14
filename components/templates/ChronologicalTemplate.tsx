'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function ChronologicalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-12 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-1">
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.linkedin && <div>{data.linkedin}</div>}
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-green-600 to-green-400"></div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Timeline */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-green-600 font-bold mb-6 text-lg">WORK HISTORY</h2>
          <div className="space-y-6 relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300"></div>
            
            {data.experience.map((exp, idx) => (
              <div key={exp.id}>
                <div className="absolute left-0 top-1 w-3 h-3 bg-green-600 rounded-full -ml-2" style={{ top: `${idx * 100 + 4}px` }}></div>
                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                <p className="text-green-600 font-semibold">{exp.company} | {exp.duration}</p>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-green-600 font-bold mb-3 text-lg">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            {data.skills.map((skill, idx) => (
              <span key={idx}>• {skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-green-600 font-bold mb-3 text-lg">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution} - {edu.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
