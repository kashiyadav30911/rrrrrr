# 🚀 AI Resume Builder

A modern, professional AI-powered resume builder with a premium SaaS interface. Create ATS-friendly resumes with AI assistance, real-time preview, and instant PDF download.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

### 🎨 Modern UI/UX
- **Premium SaaS Design** - Clean, professional interface
- **Glassmorphism Effects** - Modern visual aesthetics
- **Dark Mode Support** - Toggle between light and dark themes
- **Fully Responsive** - Optimized for all devices
- **Smooth Animations** - Polished user interactions

### 🤖 AI-Powered
- **Professional Summary Generation** - AI writes compelling summaries
- **Experience Enhancement** - Optimize job descriptions for ATS
- **Smart Skill Suggestions** - AI recommends relevant skills
- **Project Description Improvement** - Make projects stand out
- **AI Support** - Powered by OpenRouter (meta-llama/llama-3.1-8b-instruct)

### 📄 Resume Features
- **Real-time Preview** - See changes instantly
- **ATS-Friendly Templates** - Pass applicant tracking systems
- **PDF Export** - High-quality PDF download
- **Local Storage** - Save your progress
- **Multiple Sections** - Complete resume structure
  - Personal Information
  - Professional Summary
  - Work Experience
  - Projects
  - Education
  - Skills
  - Achievements

### 🎯 Professional Features
- **Drag & Drop Sections** - Reorder resume sections
- **Add/Remove Items** - Full control over content
- **Live Editing** - Edit directly in the form
- **One-Click AI Enhancement** - Improve entire resume
- **Clean Export** - Professional PDF output

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API key (recommended) or OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenRouter API Key
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

   You can get an API key at https://openrouter.ai/


4. **Get your API key**

   **For OpenRouter (Recommended):**
   - Visit [OpenRouter](https://openrouter.ai/)
   - Create a new API key
   - Copy and paste into `.env.local`

   **For OpenAI (Fallback):**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy and paste into `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
ai-resume-builder/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/
│   │   └── page.tsx          # Resume builder page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ResumeForm.tsx        # Form component
│   └── ResumePreview.tsx     # Preview component
├── types/
│   └── resume.ts             # TypeScript types
├── utils/
│   ├── aiService.ts          # AI integration
│   └── pdfExport.ts          # PDF generation
├── public/                   # Static assets
├── .env.local.example        # Environment template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide icons
- **AI Integration:** OpenRouter (primary) / OpenAI (fallback)
- **PDF Generation:** jsPDF
- **State Management:** React Hooks

## 🔧 Configuration

### AI Provider Setup

This project uses **OpenRouter** as the AI provider.

#### OpenRouter
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

You can get your OpenRouter API key at https://openrouter.ai/

### Customization

#### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },
}
```

#### Fonts
Update `app/globals.css` to change fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

## 📱 Usage Guide

### Creating a Resume

1. **Navigate to Builder**
   - Click "Create Resume" on the landing page
   - Or go directly to `/builder`

2. **Fill in Information**
   - Use the section tabs to navigate
   - Add personal info, education, experience, etc.
   - Click "+" buttons to add multiple items

3. **Enhance with AI**
   - Click "AI Enhance" button
   - Wait for AI to generate content
   - Review and edit as needed

4. **Download PDF**
   - Click "Download PDF" button
   - PDF will be saved to your downloads folder

5. **Save Progress**
   - Click "Save" to store locally
   - Data persists in browser storage

### Tips for Best Results

- **Be Specific:** Provide detailed information for better AI suggestions
- **Use Keywords:** Include industry-relevant terms
- **Quantify Achievements:** Add numbers and metrics
- **Review AI Output:** Always review and customize AI-generated content
- **Keep it Concise:** Aim for 1-2 pages

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `OPENROUTER_API_KEY` (or `OPENAI_API_KEY` as fallback)
   - Redeploy if needed

4. **Verify deployed API parity**
   - Open `https://<your-app>.vercel.app/api/generate`
   - Confirm `apiKeyConfigured: true`
   - Confirm provider/model match your expected deployment setup

5. **Check error logs (client + server)**
   - Browser console shows client-side API retry/error logs from `utils/aiService.ts`
   - Vercel Runtime Logs show server-side request/error logs from `app/api/generate/route.ts`
   - Search logs using request tags like `[API /api/generate]` and `[AI Service]`

## 🧪 CI/CD Pipeline (GitHub Actions)

This repo includes a ready-to-use pipeline at `.github/workflows/ci.yml`:
- Runs on push and PR to `main/master`
- Installs dependencies
- Runs lint
- Runs `npm run build`
- Verifies `/api/generate` responds

**How to use:**
1. Commit and push to GitHub.
2. Go to your repository Actions tab.
3. Confirm the workflow passes.

### Save production secrets in GitHub
- `OPENROUTER_API_KEY` (for production deploys)

### Vercel deployment (recommended)
1. Deploy from your GitHub repo.
2. Add env var `OPENROUTER_API_KEY` in Vercel dashboard.
3. Redeploy.

### GitHub Actions deployment pipeline
This repo includes two workflows:
- `.github/workflows/ci.yml`:
   - Installs dependencies
   - Runs lint + production build
   - Starts the production server
   - Verifies `/api/generate` health payload
- `.github/workflows/vercel-deploy.yml`:
   - Builds with Vercel CLI
   - Deploys to production
   - Runs deployment smoke verification (`scripts/verify-deployment.mjs`)

Required GitHub repository secrets for deployment workflow:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Optional secret for custom smoke prompt:
- `DEPLOY_SMOKE_PROMPT`

### Verify deployment
- Open `https://<your-app>.vercel.app/api/generate`
- Check `apiKeyConfigured: true`
- Or run `npm run verify:deploy -- https://<your-app>.vercel.app`

### Troubleshooting
If CI fails, inspect workflow logs for lint/build errors and fix them locally before push.

### Other Platforms

The app can be deployed to:
- **Netlify:** `npm run build` → Deploy `out` folder
- **AWS Amplify:** Connect GitHub repository
- **Railway:** Deploy with one click
- **Render:** Connect repository and deploy

## 🎯 Features Roadmap

- [ ] Multiple resume templates
- [ ] Cover letter generator
- [ ] Resume score checker
- [ ] LinkedIn profile optimizer
- [ ] Export to Word format
- [ ] Resume version history
- [ ] Collaborative editing
- [ ] Custom branding
- [ ] Analytics dashboard
- [ ] Job matching suggestions

## 🐛 Troubleshooting

### AI Not Working
- Check API key is correctly set in `.env.local`
- Verify API key has proper permissions
- Check browser console for errors
- Ensure you have API credits/quota

### PDF Download Issues
- Check browser allows downloads
- Try different browser
- Clear browser cache
- Check console for errors

### Styling Issues
- Run `npm run dev` to rebuild
- Clear `.next` folder
- Check Tailwind configuration
- Verify all dependencies installed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS
- **OpenRouter / OpenAI** - AI content generation
- **jsPDF** - PDF generation
- **Lucide** - Beautiful icons

## 👨‍💻 Developer

Built with ❤️ using modern web technologies

---

**Note:** API keys are handled server-side through `/api/generate` and should be configured in environment variables for local and Vercel deployments.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@resumeai.com or open an issue on GitHub.
