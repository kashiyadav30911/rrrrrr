import JSON5 from 'json5'
import { ResumeData, ResumeScore } from '@/types/resume'

/**
 * Helper to call the backend AI endpoint. The backend handles the OpenRouter API key.
 */
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callAI(prompt: string): Promise<string> {
  const requestId = `ai_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const maxAttempts = 3
  let attempt = 0
  let lastError: unknown

  while (attempt < maxAttempts) {
    attempt += 1
    console.log(`[AI Service][${requestId}] Attempt ${attempt}/${maxAttempts} - calling /api/generate`)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const payload = await response.json()

      if (!response.ok) {
        console.error(`[AI Service][${requestId}] API call failed`, {
          status: response.status,
          statusText: response.statusText,
          payload
        })

        const message = payload.error || payload.message || 'AI generation failed'
        if (message.toLowerCase().includes('api key not configured') || message.toLowerCase().includes('not configured')) {
          throw new Error('AI key missing in deployment environment. Configure OPENROUTER_API_KEY or OPENAI_API_KEY in your env vars.')
        }
        throw new Error(message)
      }

      // Support both legacy { data } and new { text } responses
      const text = payload.text ?? payload.data

      if (!text || typeof text !== 'string') {
        console.error(`[AI Service][${requestId}] Invalid AI payload format`, payload)
        throw new Error('AI response did not include text output. Please try again.')
      }

      console.log(`[AI Service][${requestId}] API call succeeded`)
      return text
    } catch (err) {
      lastError = err
      console.error(`[AI Service][${requestId}] Attempt ${attempt} failed`, err)

      // Retry for transient issues (network, rate limits) with backoff
      if (attempt < maxAttempts) {
        const delayMs = 500 * attempt
        console.warn(`[AI Service][${requestId}] Retrying in ${delayMs}ms...`)
        await sleep(delayMs)
        continue
      }

      // No more retries
      throw err
    }
  }

  throw lastError
}

/**
 * Main function to generate AI-enhanced resume content
 */
function isParseError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const err: any = error
  return (
    err.name === 'ParseError' ||
    (typeof err.message === 'string' && err.message.includes('Failed to parse AI response'))
  )
}

export async function generateAIContent(data: ResumeData): Promise<ResumeData> {
  console.log('🤖 Starting AI content generation...')

  const prompt = createDetailedPrompt(data)
  console.log('📝 Prompt created, sending to /api/generate...')

  try {
    const generatedText = await callAI(prompt)
    const enhancedData = parseAIResponse(generatedText, data)
    console.log('✨ Successfully enhanced resume data')
    return enhancedData
  } catch (error) {
    if (isParseError(error)) {
      // Let UI decide whether to retry if the response format is invalid
      throw error
    }

    console.warn('⚠️ AI enhancement failed (non-parse issue), returning original data. Error:', error)
    return data
  }
}

/**
 * Create detailed prompt for AI generation
 */
function createDetailedPrompt(data: ResumeData): string {
  return `
You are a professional resume writer and career coach. Create an ATS-friendly, professional resume based on the following information.

CANDIDATE INFORMATION:
Name: ${data.fullName || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
LinkedIn: ${data.linkedin || 'Not provided'}

CURRENT SUMMARY:
${data.summary || 'Not provided - please create a compelling professional summary'}

SKILLS:
${data.skills.length > 0 ? data.skills.join(', ') : 'Not provided - please suggest relevant skills'}

EDUCATION:
${data.education.length > 0 
  ? data.education.map(edu => `${edu.degree} from ${edu.institution} (${edu.year})${edu.gpa ? `, GPA: ${edu.gpa}` : ''}`).join('\n')
  : 'Not provided'}

WORK EXPERIENCE:
${data.experience.length > 0
  ? data.experience.map((exp, i) => `
${i + 1}. ${exp.title} at ${exp.company}
   Duration: ${exp.duration}
   Current Description: ${exp.description || 'Not provided'}
  `).join('\n')
  : 'Not provided'}

PROJECTS:
${data.projects.length > 0
  ? data.projects.map((proj, i) => `
${i + 1}. ${proj.name}
   Current Description: ${proj.description || 'Not provided'}
   Technologies: ${proj.technologies || 'Not provided'}
   Link: ${proj.link || 'Not provided'}
  `).join('\n')
  : 'Not provided'}

ACHIEVEMENTS:
${data.achievements.length > 0 ? data.achievements.join('\n') : 'Not provided'}

TASK:
Generate enhanced, ATS-optimized content for this resume. Provide your response in the following JSON format:

{
  "summary": "A compelling 2-3 sentence professional summary highlighting key strengths, experience, and career goals. Make it ATS-friendly with relevant keywords.",
  "enhancedExperience": [
    {
      "id": "experience_id_here",
      "description": "Enhanced description using action verbs, quantifiable achievements, and impact. Use bullet points with • symbol. Focus on results and metrics."
    }
  ],
  "suggestedSkills": ["skill1", "skill2", "skill3"],
  "enhancedProjects": [
    {
      "id": "project_id_here",
      "description": "Clear, concise project description highlighting technical challenges solved, technologies used, and measurable impact."
    }
  ],
  "additionalAchievements": ["achievement1", "achievement2"]
}

IMPORTANT GUIDELINES:
1. Use strong action verbs (Led, Developed, Implemented, Achieved, etc.)
2. Include quantifiable metrics where possible (%, numbers, time saved)
3. Make content ATS-friendly with relevant industry keywords
4. Keep descriptions concise but impactful
5. Focus on achievements and results, not just responsibilities
6. Use professional tone suitable for job applications
7. Ensure all content is truthful and based on provided information
8. If information is missing, provide general professional suggestions

Return ONLY the JSON object, no additional text.
`
}

/**
 * Parse AI response and merge with existing data
 */
function parseAIResponse(response: string, originalData: ResumeData): ResumeData {
  try {
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = response.trim()
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '')
    }
    
    // Find JSON object in the response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('No JSON found in response:', response)
      const err = new Error('Failed to parse AI response. Please try again.')
      err.name = 'ParseError'
      throw err
    }

    // Attempt JSON parsing; fall back to JSON5 for malformed-but-common AI output
    let parsed: any
    try {
      parsed = JSON.parse(jsonMatch[0])
    } catch (jsonErr) {
      try {
        parsed = JSON5.parse(jsonMatch[0])
      } catch (json5Err) {
        console.error('Failed JSON parsing (JSON.parse):', jsonErr)
        console.error('Failed JSON parsing (JSON5.parse):', json5Err)
        console.error('Raw AI response (truncated 500 chars):', response.slice(0, 500))
        const err = new Error('Failed to parse AI response. Please try again.')
        err.name = 'ParseError'
        throw err
      }
    }

    // Merge AI-generated content with original data
    const enhancedData: ResumeData = {
      ...originalData,
      summary: parsed.summary || originalData.summary,
      skills: [...new Set([...originalData.skills, ...(parsed.suggestedSkills || [])])],
      experience: originalData.experience.map(exp => {
        const enhanced = parsed.enhancedExperience?.find((e: any) => e.id === exp.id)
        return enhanced ? { ...exp, description: enhanced.description } : exp
      }),
      projects: originalData.projects.map(proj => {
        const enhanced = parsed.enhancedProjects?.find((p: any) => p.id === proj.id)
        return enhanced ? { ...proj, description: enhanced.description } : proj
      }),
      achievements: [
        ...originalData.achievements,
        ...(parsed.additionalAchievements || [])
      ]
    }

    return enhancedData
  } catch (error: any) {
    console.error('Error parsing AI response:', error)
    console.error('Response was:', response)
    const err = new Error('Failed to parse AI response. Please try again.')
    err.name = 'ParseError'
    throw err
  }
}

/**
 * Generate professional summary only
 */
export async function generateSummary(data: ResumeData): Promise<string> {
  const prompt = `
Generate a professional summary for a resume based on:
- Name: ${data.fullName}
- Skills: ${data.skills.join(', ')}
- Experience: ${data.experience.map(e => e.title).join(', ')}

Write a compelling 2-3 sentence professional summary that is ATS-friendly and highlights key strengths.
Return only the summary text, no additional formatting.
`

  try {
    const text = await callAI(prompt)
    return text.trim()
  } catch (error) {
    console.error('Error generating summary:', error)
    return data.summary
  }
}

/**
 * Generate enhanced job description
 */
export async function enhanceJobDescription(
  title: string,
  company: string,
  description: string
): Promise<string> {
  const prompt = `
Enhance this job experience description to be more professional and ATS-friendly:

Job Title: ${title}
Company: ${company}
Current Description: ${description}

Rewrite this using:
- Strong action verbs
- Quantifiable achievements (use realistic estimates if specific numbers aren't provided)
- Impact-focused language
- Bullet points with • symbol
- Professional tone

Return only the enhanced description, formatted with bullet points.
`

  try {
    const text = await callAI(prompt)
    return text.trim()
  } catch (error) {
    console.error('Error enhancing description:', error)
    return description
  }
}

/**
 * Suggest skills based on experience
 */
export async function suggestSkills(data: ResumeData): Promise<string[]> {
  const prompt = `
Based on this professional profile, suggest 10 relevant technical and soft skills:

Current Skills: ${data.skills.join(', ')}
Experience: ${data.experience.map(e => `${e.title} at ${e.company}`).join(', ')}
Projects: ${data.projects.map(p => p.name).join(', ')}

Return only a comma-separated list of skills, no additional text.
`

  try {
    const text = await callAI(prompt)
    const skillsText = text.trim()
    return skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0)
  } catch (error) {
    console.error('Error suggesting skills:', error)
    return []
  }
}

/**
 * Simple function to generate resume content from a prompt
 * This is the main function that can be called from components
 */
export async function generateResumeContent(prompt: string): Promise<string> {
  console.log('🤖 Generating resume content with custom prompt...')

  try {
    const text = await callAI(prompt)
    console.log('✅ Received response:', text.substring(0, 100) + '...')
    return text
  } catch (error: any) {
    console.error('❌ AI API Error:', error)
    throw new Error(`Failed to generate content: ${error.message || 'Unknown error'}`)
  }
}

/**
 * AI Skill Suggestions based on job role
 */
export async function suggestSkillsByRole(jobRole: string): Promise<string[]> {
  console.log('🎯 Generating skill suggestions for:', jobRole)

  const prompt = `
You are a career advisor. Suggest 15 relevant technical and soft skills for a ${jobRole} position.

Consider:
- Industry-standard technical skills
- Popular tools and technologies
- Soft skills valued by employers
- Certifications and methodologies

Return ONLY a comma-separated list of skills, no additional text or explanation.
Example format: JavaScript, React, Node.js, Problem Solving, Team Collaboration

Skills for ${jobRole}:`

  try {
    const text = await callAI(prompt)
    const parsed = text
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50)
      .slice(0, 15)

    console.log('✅ Generated', parsed.length, 'skill suggestions')
    return parsed
  } catch (error: any) {
    console.error('❌ Error generating skill suggestions:', error)
    // Return fallback skills based on common roles
    return getFallbackSkills(jobRole)
  }
}


/**
 * Fallback skills when API fails
 */
function getFallbackSkills(jobRole: string): string[] {
  const roleKeywords = jobRole.toLowerCase()
  
  if (roleKeywords.includes('frontend') || roleKeywords.includes('front-end')) {
    return ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'TypeScript', 'Responsive Design', 'Git', 'REST APIs', 'UI/UX', 'Webpack', 'Testing']
  } else if (roleKeywords.includes('backend') || roleKeywords.includes('back-end')) {
    return ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'REST APIs', 'Docker', 'AWS', 'Git', 'Microservices', 'Redis', 'Testing']
  } else if (roleKeywords.includes('fullstack') || roleKeywords.includes('full-stack')) {
    return ['JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB', 'REST APIs', 'Git', 'Docker', 'AWS', 'TypeScript', 'Testing', 'CI/CD']
  } else if (roleKeywords.includes('data')) {
    return ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization', 'Statistics', 'Excel', 'Tableau', 'R', 'Big Data', 'ETL']
  } else if (roleKeywords.includes('devops')) {
    return ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Git', 'Linux', 'Terraform', 'Monitoring', 'Scripting', 'Ansible', 'Security']
  } else {
    return ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Leadership', 'Critical Thinking', 'Adaptability', 'Project Management']
  }
}

/**
 * Calculate Resume Score and provide analysis
 */
export async function calculateResumeScore(data: ResumeData): Promise<ResumeScore> {
  console.log('📊 Calculating resume score...')
  
  const score: ResumeScore = {
    overall: 0,
    sections: {
      summary: 0,
      experience: 0,
      education: 0,
      skills: 0,
      projects: 0
    },
    suggestions: [],
    missingFields: [],
    keywords: []
  }

  // Score Summary (20 points)
  if (data.summary && data.summary.length > 50) {
    score.sections.summary = 20
    if (data.summary.length > 150) score.sections.summary = 20
    else score.sections.summary = 15
  } else if (data.summary) {
    score.sections.summary = 10
    score.suggestions.push('Expand your professional summary to at least 150 characters')
  } else {
    score.missingFields.push('Professional Summary')
    score.suggestions.push('Add a compelling professional summary')
  }

  // Score Experience (30 points)
  if (data.experience.length === 0) {
    score.missingFields.push('Work Experience')
    score.suggestions.push('Add at least one work experience entry')
  } else {
    const expScore = Math.min(30, data.experience.length * 10)
    score.sections.experience = expScore
    
    // Check for detailed descriptions
    const hasDetailedDesc = data.experience.some(exp => exp.description && exp.description.length > 100)
    if (!hasDetailedDesc) {
      score.suggestions.push('Add more detailed descriptions to your work experience with quantifiable achievements')
    }
  }

  // Score Education (15 points)
  if (data.education.length === 0) {
    score.missingFields.push('Education')
    score.suggestions.push('Add your educational background')
  } else {
    score.sections.education = 15
  }

  // Score Skills (20 points)
  if (data.skills.length === 0) {
    score.missingFields.push('Skills')
    score.suggestions.push('Add relevant skills to your resume')
  } else if (data.skills.length < 5) {
    score.sections.skills = 10
    score.suggestions.push('Add more skills (aim for at least 8-12 relevant skills)')
  } else if (data.skills.length < 8) {
    score.sections.skills = 15
  } else {
    score.sections.skills = 20
  }

  // Score Projects (15 points)
  if (data.projects.length === 0) {
    score.suggestions.push('Add projects to showcase your practical experience')
  } else {
    const projScore = Math.min(15, data.projects.length * 7)
    score.sections.projects = projScore
  }

  // Calculate overall score
  score.overall = Math.round(
    score.sections.summary +
    score.sections.experience +
    score.sections.education +
    score.sections.skills +
    score.sections.projects
  )

  // Add general suggestions based on overall score
  if (score.overall < 50) {
    score.suggestions.push('Your resume needs significant improvement. Focus on adding missing sections.')
  } else if (score.overall < 70) {
    score.suggestions.push('Good start! Add more details and quantifiable achievements to strengthen your resume.')
  } else if (score.overall < 85) {
    score.suggestions.push('Great resume! Fine-tune descriptions and add more keywords for ATS optimization.')
  } else {
    score.suggestions.push('Excellent resume! You\'re ready to apply for jobs.')
  }

  // Extract keywords from content
  score.keywords = extractKeywords(data)

  // Use AI for advanced analysis (non-critical; fallback to basic suggestions on failure)
  try {
    const aiSuggestions = await getAISuggestions(data)
    if (aiSuggestions.length) {
      score.suggestions = [...score.suggestions, ...aiSuggestions]
    }
  } catch (error) {
    console.log('AI suggestions unavailable, using basic analysis')
  }

  console.log('✅ Resume score calculated:', score.overall)
  return score
}

/**
 * Extract keywords from resume data
 */
function extractKeywords(data: ResumeData): string[] {
  const keywords = new Set<string>()
  
  // Add skills as keywords
  data.skills.forEach(skill => keywords.add(skill))
  
  // Extract from experience descriptions
  data.experience.forEach(exp => {
    const words = exp.description.split(/\s+/)
    words.forEach(word => {
      const cleaned = word.replace(/[^a-zA-Z0-9+#]/g, '')
      if (cleaned.length > 3 && cleaned.length < 20) {
        keywords.add(cleaned)
      }
    })
  })
  
  // Extract from projects
  data.projects.forEach(proj => {
    if (proj.technologies) {
      proj.technologies.split(',').forEach(tech => {
        keywords.add(tech.trim())
      })
    }
  })
  
  return Array.from(keywords).slice(0, 20)
}

/**
 * Get AI-powered suggestions for resume improvement
 */
async function getAISuggestions(data: ResumeData): Promise<string[]> {
  const prompt = `
Analyze this resume and provide 3-5 specific, actionable suggestions for improvement:

Name: ${data.fullName}
Summary: ${data.summary || 'Not provided'}
Experience: ${data.experience.length} entries
Education: ${data.education.length} entries
Skills: ${data.skills.join(', ')}
Projects: ${data.projects.length} entries

Provide suggestions in this format:
- Suggestion 1
- Suggestion 2
- Suggestion 3

Focus on:
1. ATS optimization
2. Quantifiable achievements
3. Industry keywords
4. Professional formatting

Return only the bullet points, no additional text.`

  try {
    const text = await callAI(prompt)

    // Parse suggestions
    const suggestions = text
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./))
      .map(line => line.replace(/^[\-\d.]\s*/, '').trim())
      .filter(s => s.length > 10)
      .slice(0, 5)

    return suggestions
  } catch (error) {
    console.error('Error getting AI suggestions:', error)
    return []
  }
}
