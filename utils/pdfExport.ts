import { ResumeData } from '@/types/resume'
import jsPDF from 'jspdf'

/**
 * Export resume as PDF
 */
export function downloadPDF(data: ResumeData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')
    doc.setTextColor(color)
    
    const lines = doc.splitTextToSize(text, contentWidth)
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, margin, yPosition)
      yPosition += fontSize * 0.5
    })
  }

  const addSpace = (space: number = 5) => {
    yPosition += space
  }

  const addLine = () => {
    doc.setDrawColor(79, 70, 229) // Primary color
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 5
  }

  // Header - Name
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(31, 41, 55) // Gray-900
  doc.text(data.fullName || 'Your Name', margin, yPosition)
  yPosition += 10

  // Contact Information
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(75, 85, 99) // Gray-600
  
  const contactInfo = [
    data.email,
    data.phone,
    data.linkedin
  ].filter(Boolean).join(' | ')
  
  if (contactInfo) {
    doc.text(contactInfo, margin, yPosition)
    yPosition += 8
  }

  addLine()

  // Professional Summary
  if (data.summary) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('PROFESSIONAL SUMMARY', margin, yPosition)
    yPosition += 7

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    const summaryLines = doc.splitTextToSize(data.summary, contentWidth)
    summaryLines.forEach((line: string) => {
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
    addSpace(5)
  }

  // Skills
  if (data.skills.length > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('SKILLS', margin, yPosition)
    yPosition += 7

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    const skillsText = data.skills.join(' • ')
    const skillsLines = doc.splitTextToSize(skillsText, contentWidth)
    skillsLines.forEach((line: string) => {
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
    addSpace(5)
  }

  // Work Experience
  if (data.experience.length > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('WORK EXPERIENCE', margin, yPosition)
    yPosition += 7

    data.experience.forEach((exp, index) => {
      // Job Title
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text(exp.title, margin, yPosition)
      yPosition += 6

      // Company and Duration
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(75, 85, 99)
      doc.text(exp.company, margin, yPosition)
      
      const durationWidth = doc.getTextWidth(exp.duration)
      doc.text(exp.duration, pageWidth - margin - durationWidth, yPosition)
      yPosition += 6

      // Description
      doc.setFontSize(10)
      doc.setTextColor(55, 65, 81)
      const descLines = doc.splitTextToSize(exp.description, contentWidth)
      descLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 5
      })
      
      if (index < data.experience.length - 1) {
        addSpace(5)
      }
    })
    addSpace(5)
  }

  // Projects
  if (data.projects.length > 0) {
    if (yPosition > pageHeight - 60) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('PROJECTS', margin, yPosition)
    yPosition += 7

    data.projects.forEach((project, index) => {
      // Project Name
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text(project.name, margin, yPosition)
      yPosition += 6

      // Description
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(55, 65, 81)
      const projDescLines = doc.splitTextToSize(project.description, contentWidth)
      projDescLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 5
      })

      // Technologies
      doc.setFontSize(9)
      doc.setTextColor(75, 85, 99)
      doc.text(`Technologies: ${project.technologies}`, margin, yPosition)
      yPosition += 5

      if (project.link) {
        doc.setTextColor(79, 70, 229)
        doc.text(project.link, margin, yPosition)
        yPosition += 5
      }

      if (index < data.projects.length - 1) {
        addSpace(3)
      }
    })
    addSpace(5)
  }

  // Education
  if (data.education.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('EDUCATION', margin, yPosition)
    yPosition += 7

    data.education.forEach((edu, index) => {
      // Degree
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text(edu.degree, margin, yPosition)
      yPosition += 6

      // Institution and Year
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(75, 85, 99)
      doc.text(edu.institution, margin, yPosition)
      
      const yearText = edu.gpa ? `${edu.year} | GPA: ${edu.gpa}` : edu.year
      const yearWidth = doc.getTextWidth(yearText)
      doc.text(yearText, pageWidth - margin - yearWidth, yPosition)
      yPosition += 6

      if (index < data.education.length - 1) {
        addSpace(3)
      }
    })
    addSpace(5)
  }

  // Achievements
  if (data.achievements.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('ACHIEVEMENTS', margin, yPosition)
    yPosition += 7

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)

    data.achievements.forEach((achievement) => {
      const achLines = doc.splitTextToSize(`• ${achievement}`, contentWidth - 5)
      achLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin + 2, yPosition)
        yPosition += 5
      })
    })
  }

  // Save PDF
  const fileName = `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf'
  doc.save(fileName)
}
