'use client'

import { ResumeData } from '@/types/resume'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="bg-white" id="resume-content">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-3">
          {data.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
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

      <div className="p-8">
        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
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
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Work Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {exp.duration}
                    </span>
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
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">Technologies:</span> {project.technologies}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{edu.year}</span>
                      {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
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
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
              <span className="w-2 h-8 bg-blue-600 mr-3"></span>
              Achievements
            </h2>
            <ul className="space-y-2 text-gray-700">
              {data.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
