'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function ExecutiveTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-950 text-white p-14 shadow-2xl">
      {/* Header */}
      <div className="pb-8 mb-8 border-b border-slate-700">
        <h1 className="text-5xl font-light tracking-tight mb-2">{data.fullName || 'YOUR NAME'}</h1>
        <div className="flex gap-6 text-slate-400 text-sm mt-4 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-slate-400 text-sm font-bold tracking-widest mb-3">EXECUTIVE PROFILE</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Leadership Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-slate-400 text-sm font-bold tracking-widest mb-4">LEADERSHIP EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-white">{exp.title}</h3>
                  <span className="text-slate-500 text-sm">{exp.duration}</span>
                </div>
                <p className="text-slate-400 text-sm">{exp.company}</p>
                <p className="text-slate-300 text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-slate-400 text-sm font-bold tracking-widest mb-3">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            {data.skills.map((skill, idx) => (
              <span key={idx}>• {skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
