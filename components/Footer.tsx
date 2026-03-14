'use client'

import Link from 'next/link'
import { FileText, Mail, Linkedin, Twitter, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Templates', href: '#templates' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Blog', href: '/blog' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press', href: '/press' },
    ],
    Resources: [
      { label: 'Resume Examples', href: '/examples' },
      { label: 'Resume Tips', href: '/tips' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Help Center', href: '/help' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@resumecraft.com' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-poppins">ResumeCraft</span>
            </Link>
            <p className="text-gray-500 mb-6">
              Build professional resumes powered by AI to land your dream job.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold font-poppins mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-10">
          {/* Bottom Content */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} ResumeCraft. Crafted with ❤️ to help you land your dream job.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
