'use client'

import { Zap, Sparkles, Download } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Sparkles,
      title: 'AI Resume Generator',
      description: 'Powered by advanced AI, our system generates compelling resume content tailored to your experience and target roles.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      icon: Zap,
      title: 'Professional Templates',
      description: 'Choose from expertly designed templates that are ATS-optimized and proven to get you noticed by recruiters.',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      id: 3,
      icon: Download,
      title: 'Instant PDF Download',
      description: 'Export your resume as a perfectly formatted PDF in seconds. Download, print, or share anywhere.',
      gradient: 'from-pink-500 to-pink-600',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a resume that stands out and lands interviews.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.id}
                className="group rounded-2xl p-8 bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 font-poppins mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div className="mt-6 pt-6 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold text-blue-600">Learn more →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
