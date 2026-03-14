'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'
import ClassicProfessionalTemplate from '@/components/templates/ClassicProfessionalTemplate'
import ModernMinimalTemplate from '@/components/templates/ModernMinimalTemplate2'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'
import TechnicalTemplate from '@/components/templates/TechnicalTemplate'
import AcademicTemplate from '@/components/templates/AcademicTemplate'
import ChronologicalTemplate from '@/components/templates/ChronologicalTemplate'
import FunctionalTemplate from '@/components/templates/FunctionalTemplate'
import CombinationTemplate from '@/components/templates/CombinationTemplate'
import OnePageTemplate from '@/components/templates/OnePageTemplate'
import ModernColorBlockTemplate from '@/components/templates/ModernColorBlockTemplate'

const templates = [
  {
    id: 1,
    name: 'Classic Professional',
    description: 'Timeless design with traditional structure. Perfect for corporate and formal roles.',
    color: 'from-gray-600 to-gray-700',
    component: ClassicProfessionalTemplate,
    icon: '📄',
    bestFor: 'Corporate, Finance, Law',
  },
  {
    id: 2,
    name: 'Modern Minimal',
    description: 'Clean and minimalist design with modern typography. Ideal for design-focused roles.',
    color: 'from-blue-500 to-blue-600',
    component: ModernMinimalTemplate,
    icon: '✨',
    bestFor: 'Design, Tech, Startups',
  },
  {
    id: 3,
    name: 'Creative',
    description: 'Bold gradient header with vibrant styling. Great for creative professionals.',
    color: 'from-purple-600 to-pink-600',
    component: CreativeTemplate,
    icon: '🎨',
    bestFor: 'Creative, Marketing, Design',
  },
  {
    id: 4,
    name: 'Executive',
    description: 'Premium dark design with elegant typography. Perfect for C-level positions.',
    color: 'from-slate-800 to-slate-900',
    component: ExecutiveTemplate,
    icon: '👔',
    bestFor: 'Executive, Management, Senior',
  },
  {
    id: 5,
    name: 'Technical',
    description: 'Code-inspired layout with monospace fonts. Ideal for developers and engineers.',
    color: 'from-blue-700 to-blue-800',
    component: TechnicalTemplate,
    icon: '💻',
    bestFor: 'Engineering, Development, Tech',
  },
  {
    id: 6,
    name: 'Academic',
    description: 'Formal scholarly design with serif fonts. Perfect for researchers and educators.',
    color: 'from-amber-700 to-amber-800',
    component: AcademicTemplate,
    icon: '📚',
    bestFor: 'Academia, Research, Education',
  },
  {
    id: 7,
    name: 'Chronological',
    description: 'Timeline-based layout with visual hierarchy. Great for progressive career paths.',
    color: 'from-green-600 to-green-700',
    component: ChronologicalTemplate,
    icon: '📅',
    bestFor: 'Traditional, Progressive Roles',
  },
  {
    id: 8,
    name: 'Functional',
    description: 'Skills-first approach emphasizing competencies. Ideal for career changers.',
    color: 'from-orange-600 to-orange-700',
    component: FunctionalTemplate,
    icon: '⚙️',
    bestFor: 'Career Change, Skills Focus',
  },
  {
    id: 9,
    name: 'Combination',
    description: 'Hybrid approach combining skills and experience. Versatile for any industry.',
    color: 'from-teal-600 to-teal-700',
    component: CombinationTemplate,
    icon: '🔀',
    bestFor: 'Any Industry, Versatile',
  },
  {
    id: 10,
    name: 'One-Page',
    description: 'Compact design fitting on a single page. Perfect for entry-level positions.',
    color: 'from-indigo-600 to-indigo-700',
    component: OnePageTemplate,
    icon: '📋',
    bestFor: 'Entry-Level, Graduates',
  },
  {
    id: 11,
    name: 'Modern Color Block',
    description: 'Modern design with color-coded sections. Eye-catching for visual thinkers.',
    color: 'from-red-500 via-blue-500 to-green-500',
    component: ModernColorBlockTemplate,
    icon: '🎯',
    bestFor: 'HR, Creative, Visual Focus',
  },
]

// Sample resume data for preview
const sampleResumeData = {
  fullName: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/johndoe',
  summary: 'Experienced professional with 5+ years in technology and business development. Seeking challenging roles to leverage expertise in team leadership and strategic planning.',
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      year: '2019',
      gpa: '3.8',
    },
  ],
  skills: ['Leadership', 'Project Management', 'Data Analysis', 'Communication', 'Problem Solving', 'Strategic Planning'],
  experience: [
    {
      id: '1',
      title: 'Senior Project Manager',
      company: 'Tech Innovations Inc',
      duration: 'Jan 2021 - Present',
      description: 'Led cross-functional teams of 10+ members to deliver enterprise solutions. Increased project delivery efficiency by 30%.',
    },
    {
      id: '2',
      title: 'Business Analyst',
      company: 'Global Solutions LLC',
      duration: 'Jun 2019 - Dec 2020',
      description: 'Analyzed business requirements and translated them into technical specifications. Improved process efficiency by 25%.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Enterprise Dashboard System',
      description: 'Developed comprehensive analytics dashboard for data-driven decision making.',
      technologies: 'React, Node.js, MongoDB',
      link: 'github.com/johndoe/dashboard',
    },
  ],
  achievements: ['Employee of the Month (3x)', 'Best Project Delivery Award', 'Leadership Excellence Certificate'],
}

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const SelectedComponent = templates[selectedTemplate].component

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-2xl text-blue-600 font-poppins">
              ResumeCraft
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="px-4 py-2 text-gray-600 hover:text-blue-600 transition font-medium">
                ← Back Home
              </Link>
              <Link href="/builder" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-24 pb-12 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 font-poppins">10 Professional Resume Templates</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from expertly designed templates optimized for ATS systems and proven to get results.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Template Selector */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">All Templates</h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {templates.map((template, index) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedTemplate === index
                        ? `bg-gradient-to-r ${template.color} text-white shadow-lg transform scale-105`
                        : 'bg-white border border-gray-200 text-gray-900 hover:border-blue-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-sm truncate">{template.name}</p>
                        <p className={`text-xs truncate ${selectedTemplate === index ? 'text-blue-100' : 'text-gray-500'}`}>
                          {template.bestFor}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-3">
            {/* Template Info */}
            <div className="mb-6 bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 font-poppins">{templates[selectedTemplate].name}</h3>
                  <p className="text-gray-600 mt-2">{templates[selectedTemplate].description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Best for:</span>
                    <span className="text-sm text-blue-600 font-medium">{templates[selectedTemplate].bestFor}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Link
                  href={`/builder?template=${templates[selectedTemplate].id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Use This Template</span>
                </Link>
                <button 
                  onClick={() => {
                    const element = document.querySelector('.template-preview');
                    if (element) {
                      const canvas = document.createElement('canvas');
                      canvas.width = 850;
                      canvas.height = 1100;
                      alert('Download feature will be available soon! For now, you can use your browser\'s print function (Ctrl+P) to save as PDF.');
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold hover:shadow-md"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Preview</span>
                </button>
              </div>
            </div>

            {/* Template Preview Card */}
            <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow template-preview">
              <div className="overflow-auto max-h-[800px]">
                <SelectedComponent data={sampleResumeData} />
              </div>
            </div>

            {/* Template Features */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-600 transition">
                <h4 className="font-bold text-gray-900 mb-2">✓ ATS Optimized</h4>
                <p className="text-sm text-gray-600">Passes all applicant tracking systems</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-600 transition">
                <h4 className="font-bold text-gray-900 mb-2">✓ Print Ready</h4>
                <p className="text-sm text-gray-600">Perfect formatting on all devices</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-600 transition">
                <h4 className="font-bold text-gray-900 mb-2">✓ Fully Customizable</h4>
                <p className="text-sm text-gray-600">Easy to edit and personalize</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid Overview */}
      <div className="bg-gray-50 py-16 px-4 mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-poppins">Why Choose These Templates?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(index)}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-poppins">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <p className="text-xs font-semibold text-blue-600">👥 {template.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-poppins">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What makes these templates ATS-friendly?</h3>
              <p className="text-gray-700">All templates use clean formatting, standard fonts, and proper hierarchy to ensure they pass applicant tracking systems without issues.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I customize the templates?</h3>
              <p className="text-gray-700">Yes! All templates are fully customizable. You can change colors, fonts, content, and layout to match your personal brand.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Which template should I choose?</h3>
              <p className="text-gray-700">Choose based on your industry and career stage. Creative roles work well with attractive designs, while traditional industries prefer minimal, professional layouts.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I switch templates after starting?</h3>
              <p className="text-gray-700">Absolutely! You can switch between any template at any time. Your content will transfer seamlessly to the new design.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-poppins">Start Building Your Resume Today</h2>
          <p className="text-lg text-blue-100 mb-8">
            Pick any template above and create your professional resume in minutes with our AI-powered builder
          </p>
          <Link href="/builder" className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-50 transition shadow-lg">
            Get Started Free
          </Link>
          <p className="text-blue-100 text-sm mt-4">No credit card required • Download unlimited resumes</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">ResumeCraft</h4>
              <p className="text-sm">Professional Resume Builder powered by AI</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/builder" className="hover:text-white transition">Builder</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 ResumeCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
