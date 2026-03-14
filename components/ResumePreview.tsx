'use client'

import { ResumeData } from '@/types/resume'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'

interface ResumePreviewProps {
  data: ResumeData
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-8 md:p-12" id="resume-content">
        {/* Header */}
        <div className="border-b-2 border-primary-600 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {data.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Achievements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {data.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty State */}
        {!data.fullName && !data.summary && data.experience.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Start filling out the form to see your resume preview</p>
          </div>
        )}
      </div>
    </div>
  )
}
