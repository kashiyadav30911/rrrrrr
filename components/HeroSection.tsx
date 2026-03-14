'use client'

import Link from 'next/link'
import { ArrowRight, Award, Star, Trophy } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6 animate-fadeIn">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight font-poppins">
              Build your perfect resume in minutes.
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-inter">
              Land your dream job with professional, AI-powered resumes designed to impress recruiters.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary Button */}
              <Link
                href="/builder"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 group w-full sm:w-auto"
              >
                Get Started For Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="#templates"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 group w-full sm:w-auto"
              >
                View Templates
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Illustration Area */}
          <div className="relative h-96 md:h-full flex items-center justify-center animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {/* Floating Resume Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
              
              {/* Resume Card */}
              <div className="relative z-10 w-full max-w-xs bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transform hover:scale-105 hover:shadow-3xl transition-all duration-500 animate-float">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Senior Developer</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2">ACHIEVEMENTS</p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                        <Trophy className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-900">10+ Awards</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1.5 rounded-lg">
                        <Star className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-semibold text-gray-900">5 Stars</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
