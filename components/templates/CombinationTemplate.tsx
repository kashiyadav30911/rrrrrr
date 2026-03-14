'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function CombinationTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-12 shadow-lg">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-4 border-teal-600">
        <h1 className="text-5xl font-bold text-gray-900">{data.fullName || 'YOUR NAME'}</h1>
        <div className="flex gap-8 text-gray-600 text-sm mt-4 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-teal-600 font-bold mb-3 uppercase">Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Key Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8 bg-teal-50 p-4 rounded">
          <h2 className="text-teal-600 font-bold mb-3 uppercase">Key Skills</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            {data.skills.map((skill, idx) => (
              <span key={idx}>• {skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience & Achievements */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-teal-600 font-bold mb-3 uppercase">Experience Highlights</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-teal-600 pl-4">
                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                <p className="text-teal-600 font-semibold text-sm">{exp.company} | {exp.duration}</p>
                <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="text-teal-600 font-bold mb-3 uppercase">Education</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-gray-700 text-sm">
                <div className="font-bold">{edu.degree}</div>
                <div className="text-gray-600">{edu.institution} - {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
