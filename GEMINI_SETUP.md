# 🤖 Google Gemini AI Integration Guide

Complete guide to integrate Google Gemini AI into your Resume Builder.

## 📦 Step 1: Install Gemini AI Library

The `@google/generative-ai` package has been installed. If you need to reinstall:

```bash
npm install @google/generative-ai
```

## 🔑 Step 2: Get Your Free Gemini API Key

1. **Visit Google AI Studio:**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key:**
   - Click "Create API Key"
   - Select a Google Cloud project (or create a new one)
   - Copy the generated API key

3. **API Key Features:**
   - ✅ Free tier available
   - ✅ No credit card required
   - ✅ Generous rate limits
   - ✅ Fast response times

## ⚙️ Step 3: Configure Environment Variables

1. **Create `.env.local` file** in the root directory:

```env
# Google Gemini API Key (Primary)
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here

# AI Provider Selection
NEXT_PUBLIC_AI_PROVIDER=gemini
```

2. **Replace `your_actual_api_key_here`** with your real API key from Step 2

3. **Restart the development server:**
```bash
npm run dev
```

## 🎯 Step 4: How It Works

### AI Service Architecture

The AI integration is located in `utils/aiService.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY)

// Generate enhanced resume
export async function generateAIContent(data: ResumeData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const result = await model.generateContent(prompt)
  return enhancedData
}
```

### What AI Enhances

1. **Professional Summary**
   - Creates compelling 2-3 sentence summaries
   - Includes relevant keywords for ATS
   - Highlights key strengths

2. **Work Experience**
   - Rewrites descriptions with action verbs
   - Adds quantifiable achievements
   - Focuses on impact and results

3. **Skills Suggestions**
   - Recommends relevant technical skills
   - Suggests soft skills based on experience
   - Ensures ATS compatibility

4. **Project Descriptions**
   - Clarifies technical challenges solved
   - Highlights measurable impact
   - Improves readability

5. **Additional Achievements**
   - Suggests relevant accomplishments
   - Formats professionally

## 🚀 Step 5: Using AI Features

### In the Resume Builder

1. **Fill in your information:**
   - Add personal details
   - Enter work experience
   - List projects and education

2. **Click "AI Enhance" button:**
   - AI analyzes your data
   - Generates professional content
   - Updates resume in real-time

3. **Review and edit:**
   - Check AI-generated content
   - Make any necessary adjustments
   - Customize to your preference

### Available AI Functions

```typescript
// Full resume enhancement
await generateAIContent(resumeData)

// Generate summary only
await generateSummary(resumeData)

// Enhance job description
await enhanceJobDescription(title, company, description)

// Suggest skills
await suggestSkills(resumeData)
```

## 📋 Step 6: Resume Templates

Choose from 4 professional templates:

### 1. Default Template
- Classic ATS-friendly design
- Clean and professional
- Maximum compatibility

### 2. Modern Template
- Gradient header
- Colorful accents
- Contemporary look

### 3. Minimal Template
- Centered layout
- Ultra-clean design
- Elegant typography

### 4. Professional Template
- Two-column layout
- Sidebar for contact/skills
- Corporate style

**Switch templates:** Click the "Templates" button in the builder header

## 📥 Step 7: PDF Download

Download your resume as a high-quality PDF:

1. Click "Download PDF" button
2. PDF is generated instantly
3. Saved to your downloads folder

**Features:**
- Professional formatting
- Print-ready quality
- ATS-compatible

## 🔧 Troubleshooting

### "API key not configured" Error

**Solution:**
1. Check `.env.local` file exists
2. Verify API key is correct
3. Ensure no extra spaces in the key
4. Restart dev server: `npm run dev`

### "Failed to generate AI content" Error

**Possible causes:**
1. **Invalid API key** - Get a new key from Google AI Studio
2. **Rate limit exceeded** - Wait a few minutes and try again
3. **Network issue** - Check your internet connection
4. **API quota exhausted** - Check your Google Cloud quota

**Debug steps:**
```bash
# Check if API key is loaded
console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

# Test API directly
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY
```

### AI Response is Slow

**Tips:**
- Use `gemini-1.5-flash` model (faster)
- Reduce input data size
- Check your internet speed
- Try during off-peak hours

### AI Generated Content is Not Good

**Improvements:**
1. **Provide more details** - Add specific achievements and metrics
2. **Use clear descriptions** - Write concise current descriptions
3. **Add context** - Include relevant technologies and tools
4. **Be specific** - Mention concrete results and impacts

## 🎨 Customization

### Modify AI Prompts

Edit `utils/aiService.ts` to customize AI behavior:

```typescript
function createDetailedPrompt(data: ResumeData): string {
  return `
    Your custom instructions here...
    
    Focus on: ${yourCustomFocus}
    Tone: ${yourPreferredTone}
    Keywords: ${yourIndustryKeywords}
  `
}
```

### Add New AI Features

```typescript
// Example: Generate cover letter
export async function generateCoverLetter(data: ResumeData, jobDescription: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const prompt = `Generate a cover letter for ${data.fullName}...`
  const result = await model.generateContent(prompt)
  return result.response.text()
}
```

## 📊 API Usage & Limits

### Free Tier Limits (Gemini)
- **Requests per minute:** 60
- **Requests per day:** 1,500
- **Tokens per minute:** 32,000

### Best Practices
1. Cache AI responses locally
2. Implement rate limiting
3. Show loading states
4. Handle errors gracefully
5. Provide fallback content

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use `NEXT_PUBLIC_` prefix for client-side keys
- ✅ Rotate API keys periodically
- ✅ Monitor API usage

### Production Deployment
For production, consider:
1. **Backend API route** - Hide API key server-side
2. **Rate limiting** - Prevent abuse
3. **User authentication** - Track usage per user
4. **Caching** - Reduce API calls

## 📚 Additional Resources

- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Resume Writing Best Practices](https://www.indeed.com/career-advice/resumes-cover-letters)

## 🆘 Need Help?

1. Check the [README.md](README.md) for general setup
2. Review [QUICKSTART.md](QUICKSTART.md) for quick start
3. Check browser console for error messages
4. Verify API key in Google AI Studio
5. Test with minimal data first

## ✅ Verification Checklist

Before using AI features:

- [ ] Gemini API key obtained
- [ ] `.env.local` file created
- [ ] API key added to `.env.local`
- [ ] Development server restarted
- [ ] Browser console shows no errors
- [ ] Test with sample data
- [ ] AI Enhance button works
- [ ] Generated content appears
- [ ] PDF download works

---

**Ready to build amazing resumes with AI!** 🚀
