export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  gpa?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  duration: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link?: string
}

export interface ResumeData {
  fullName: string
  email: string
  phone: string
  linkedin: string
  summary: string
  education: Education[]
  skills: string[]
  experience: Experience[]
  projects: Project[]
  achievements: string[]
}

// Job Application Tracker Types
export interface JobApplication {
  id: string
  company: string
  position: string
  status: 'applied' | 'interview' | 'rejected' | 'offer'
  appliedDate: string
  notes?: string
  salary?: string
  location?: string
}

// Resume Score Types
export interface ResumeScore {
  overall: number
  sections: {
    summary: number
    experience: number
    education: number
    skills: number
    projects: number
  }
  suggestions: string[]
  missingFields: string[]
  keywords: string[]
}
