import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'ResumeCraft - AI-Powered Resume Builder | Professional Templates',
  description: 'Build your professional resume in minutes with AI assistance. Choose from ATS-optimized templates, get AI-powered suggestions, and download instantly. Join 10,000+ job seekers landing their dream jobs.',
  keywords: 'resume builder, AI resume, professional resume, ATS-friendly resume, resume templates, CV builder, job application',
  authors: [{ name: 'ResumeCraft' }],
  openGraph: {
    title: 'ResumeCraft - Build Your Perfect Resume in Minutes',
    description: 'Land your dream job with professional, AI-powered resumes designed to impress recruiters.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
