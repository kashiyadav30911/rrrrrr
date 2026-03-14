'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-blue-50 border-b border-blue-200">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-poppins mb-6">
            Create your professional resume today.
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs using ResumeCraft.
          </p>

          {/* CTA Button */}
          <Link
            href="/builder"
            className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group text-lg"
          >
            Build My Resume
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Bonus Text */}
          <p className="mt-8 text-gray-600 font-medium">
            ✓ No credit card required  •  Free forever plan  •  Download unlimited resumes
          </p>
        </div>
      </div>
    </section>
  )
}
