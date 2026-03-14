'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TemplatesSection() {
  const templates = [
    {
      id: 1,
      name: 'Professional',
      description: 'Classic and formal design perfect for corporate roles',
      gradient: 'from-blue-600 to-blue-400',
      icon: '📄',
    },
    {
      id: 2,
      name: 'Modern',
      description: 'Contemporary layout ideal for creative positions',
      gradient: 'from-purple-600 to-pink-400',
      icon: '✨',
    },
    {
      id: 3,
      name: 'Minimal',
      description: 'Clean and simple design for maximum focus',
      gradient: 'from-green-600 to-emerald-400',
      icon: '🎯',
    },
    {
      id: 4,
      name: 'Executive',
      description: 'Premium layout for senior-level professionals',
      gradient: 'from-indigo-600 to-blue-500',
      icon: '👔',
    },
  ]

  return (
    <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of beautifully designed templates that are optimized for ATS and designed to impress recruiters.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Template Preview */}
              <div className={`h-64 bg-gradient-to-br ${template.gradient} relative overflow-hidden`}>
                <div className="p-6 h-full flex flex-col justify-between text-white">
                  <div className="text-5xl">{template.icon}</div>
                  <div>
                    <p className="text-sm font-medium opacity-75">Template Preview</p>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 font-poppins mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {template.description}
                </p>
                <button className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg group/btn">
                  Use Template
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-3.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 group"
          >
            View All Templates
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
