# ⚠️ API Key Expired - Quick Fix

## 🔴 Issue Detected

Your Gemini API key has **expired** and needs to be renewed.

```
Error: API key expired. Please renew the API key.
```

## ✅ Solution (2 Minutes)

### Step 1: Get a New API Key

1. **Visit Google AI Studio:**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Sign in** with your Google account

3. **Create a new API key:**
   - Click "Create API Key" button
   - Select your Google Cloud project (or create new one)
   - Copy the new API key

### Step 2: Update Your .env.local File

1. **Open `.env.local`** in your project root

2. **Replace the old key** with your new key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_new_api_key_here
   ```

3. **Save the file**

### Step 3: Restart the Server

```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 4: Test Again

```bash
# Run the test script:
node test-gemini-api.js
```

You should see:
```
✅ SUCCESS! Gemini API is working!
```

## 🎯 Quick Commands

```bash
# 1. Stop server
Ctrl+C

# 2. Test API key
node test-gemini-api.js

# 3. Restart server
npm run dev

# 4. Open app
# Visit: http://localhost:3001
```

## 📝 Your Current API Key

```
Old Key: AIzaSyAXLLEqOreN5opcllBYOSHyTdK2KExEkZQ (EXPIRED ❌)
New Key: [Get from Google AI Studio] ✅
```

## 🔗 Important Links

- **Get API Key:** https://makersuite.google.com/app/apikey
- **Gemini Docs:** https://ai.google.dev/docs
- **Troubleshooting:** See [GEMINI_SETUP.md](GEMINI_SETUP.md)

## ⏱️ Why Did It Expire?

Gemini API keys can expire for several reasons:
- Security policy
- Inactivity
- Project changes
- Manual revocation

**Solution:** Just create a new one - it's free and takes 30 seconds!

## ✅ After Getting New Key

1. Update `.env.local`
2. Restart server
3. Test with: `node test-gemini-api.js`
4. Open app: http://localhost:3001
5. Click "AI Enhance" - it will work! 🎉

## 🆘 Still Having Issues?

### Check These:

1. **API Key Format:**
   ```env
   # ✅ Correct
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAbc123...xyz789
   
   # ❌ Wrong (no quotes)
   NEXT_PUBLIC_GEMINI_API_KEY="AIzaSyAbc123...xyz789"
   
   # ❌ Wrong (no spaces)
   NEXT_PUBLIC_GEMINI_API_KEY = AIzaSyAbc123...xyz789
   ```

2. **File Location:**
   ```
   ✅ Correct: /project-root/.env.local
   ❌ Wrong: /project-root/app/.env.local
   ❌ Wrong: /project-root/.env
   ```

3. **Server Restart:**
   - Always restart after changing .env.local
   - Changes don't apply until restart

## 🎉 Once Fixed

Your AI Resume Builder will:
- ✅ Generate professional summaries
- ✅ Enhance job descriptions
- ✅ Suggest relevant skills
- ✅ Optimize for ATS
- ✅ Create multiple resume versions

---

**Get your new API key now:** https://makersuite.google.com/app/apikey

It's free and takes less than 1 minute! 🚀
