'use client'

import { ResumeData } from '@/types/resume'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="bg-white" id="resume-content">
      {/* Two Column Layout */}
      <div className="grid grid-cols-3">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gray-800 text-white p-8">
          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-600">
              CONTACT
            </h2>
            <div className="space-y-3 text-sm">
              {data.email && (
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-start space-x-2">
                  <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-600">
                SKILLS
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-600">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-blue-300 mb-1">{edu.degree}</h3>
                    <p className="text-gray-300 mb-1">{edu.institution}</p>
                    <p className="text-gray-400 text-xs">{edu.year}</p>
                    {edu.gpa && <p className="text-gray-400 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-600">
                ACHIEVEMENTS
              </h2>
              <ul className="space-y-2 text-sm">
                {data.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="col-span-2 p-8">
          {/* Name */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {data.fullName || 'Your Name'}
            </h1>
            <div className="h-1 w-24 bg-blue-600"></div>
          </div>

          {/* Professional Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-blue-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                Projects
              </h2>
              <div className="space-y-5">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
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
                      <span className="font-semibold">Technologies:</span> {project.technologies}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
