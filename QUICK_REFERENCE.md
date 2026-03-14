# 🚀 Quick Reference Card

## Setup (2 Minutes)

```bash
# 1. Get API Key
Visit: https://makersuite.google.com/app/apikey

# 2. Create .env.local
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key_here" > .env.local
echo "NEXT_PUBLIC_AI_PROVIDER=gemini" >> .env.local

# 3. Start
npm run dev
```

## Key Features

| Feature | Button | Location |
|---------|--------|----------|
| AI Enhancement | "AI Enhance" | Builder Header |
| Template Switch | "Templates" | Builder Header |
| Save Progress | "Save" | Builder Header |
| Download PDF | "Download PDF" | Builder Header |
| Dark Mode | 🌙/🌞 | Builder Header |

## Templates

| Template | Icon | Style | Best For |
|----------|------|-------|----------|
| Default | 📄 | Classic | All industries |
| Modern | ✨ | Gradient | Tech/Creative |
| Minimal | 📋 | Clean | Design/Arts |
| Professional | 💼 | Two-column | Business/Executive |

## AI Functions

```typescript
// Full enhancement
await generateAIContent(resumeData)

// Summary only
await generateSummary(resumeData)

// Enhance job description
await enhanceJobDescription(title, company, description)

// Suggest skills
await suggestSkills(resumeData)
```

## File Structure

```
├── app/
│   ├── page.tsx                    # Landing page
│   ├── builder/page.tsx            # Resume builder
│   └── globals.css                 # Global styles
├── components/
│   ├── ResumeForm.tsx              # Input form
│   ├── ResumePreview.tsx           # Default template
│   └── templates/
│       ├── ModernTemplate.tsx      # Modern design
│       ├── MinimalTemplate.tsx     # Minimal design
│       └── ProfessionalTemplate.tsx # Professional design
├── utils/
│   ├── aiService.ts                # AI integration
│   └── pdfExport.ts                # PDF generation
├── types/
│   └── resume.ts                   # TypeScript types
└── .env.local                      # API keys (create this)
```

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm install

# Add new package
npm install package-name
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API key error | Check `.env.local` exists and has correct key |
| AI not working | Restart server: `npm run dev` |
| Templates not showing | Click "Templates" button in header |
| PDF not downloading | Check browser allows downloads |

## Environment Variables

```env
# Required
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key

# Optional
NEXT_PUBLIC_AI_PROVIDER=gemini
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
```

## API Limits (Gemini Free)

- 60 requests/minute
- 1,500 requests/day
- 32,000 tokens/minute

## Quick Tips

1. **Fill details first** - More info = better AI output
2. **Review AI content** - Always customize
3. **Save frequently** - Click "Save" button
4. **Try templates** - Test all 4 designs
5. **Use metrics** - Add numbers and achievements

## Support

- Setup Guide: [GEMINI_SETUP.md](GEMINI_SETUP.md)
- Full Docs: [README.md](README.md)
- Quick Start: [QUICKSTART.md](QUICKSTART.md)
- Integration: [AI_INTEGRATION_COMPLETE.md](AI_INTEGRATION_COMPLETE.md)

---

**Need help?** Check the documentation files above! 📚
