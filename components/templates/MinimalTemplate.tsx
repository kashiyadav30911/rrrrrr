'use client'

import { ResumeData } from '@/types/resume'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'

interface MinimalTemplateProps {
  data: ResumeData
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="bg-white p-12" id="resume-content">
      {/* Header - Centered */}
      <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {data.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <span>{data.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Skills
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.skills.join(' • ')}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-gray-600 italic mb-2">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Projects
          </h2>
          <div className="space-y-5">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Link</span>
                    </a>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed mb-2 text-justify">{project.description}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tech:</span> {project.technologies}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600 italic">{edu.institution}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-sm text-gray-500">{edu.year}</span>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Achievements
          </h2>
          <ul className="space-y-2 text-gray-700">
            {data.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">—</span>
                <span className="text-justify">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
