'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function ModernMinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-50 p-12 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        </div>
        <div className="flex gap-4 mt-3 text-sm text-gray-600 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
        <div className="w-12 h-1 bg-blue-600 mt-4"></div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 text-sm">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-blue-600 text-sm font-medium">{exp.company}</p>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Skills</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            {data.skills.map((skill, idx) => (
              <div key={idx}>• {skill}</div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
          <div className="space-y-3">
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
