'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <span className="text-2xl font-bold text-blue-600 font-poppins">ResumeCraft</span>
          </Link>


          {/* Desktop Right - CTA Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/builder"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
