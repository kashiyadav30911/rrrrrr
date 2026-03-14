'use client'

import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Colored Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-2">{data.fullName || 'YOUR NAME'}</h1>
      </div>

      {/* Content */}
      <div className="p-12">
        {/* Contact */}
        <div className="flex gap-8 mb-8 text-sm flex-wrap">
          {data.email && (
            <div>
              <span className="text-purple-600 font-bold">Email:</span>
              <p className="text-gray-700">{data.email}</p>
            </div>
          )}
          {data.phone && (
            <div>
              <span className="text-purple-600 font-bold">Phone:</span>
              <p className="text-gray-700">{data.phone}</p>
            </div>
          )}
          {data.linkedin && (
            <div>
              <span className="text-purple-600 font-bold">Portfolio:</span>
              <p className="text-gray-700">{data.linkedin}</p>
            </div>
          )}
        </div>

        {/* About */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-purple-600 font-bold text-lg mb-3">ABOUT</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-purple-600 font-bold text-lg mb-3">EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-purple-600 text-sm">{exp.company} • {exp.duration}</p>
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-purple-600 font-bold text-lg mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
