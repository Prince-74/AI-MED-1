# 🚀 Deployment Guide - AI-MED

Complete guide to deploy your forked AI-MED project to Vercel (Frontend) and Render (Backend).

---

## 📋 Prerequisites

Before deploying, ensure you have:

✅ **GitHub Account** with your forked repository  
✅ **Vercel Account** (Free tier available - https://vercel.com)  
✅ **Render Account** (Free tier available - https://render.com)  
✅ **MongoDB Atlas** database (Cloud - https://mongodb.com/cloud/atlas)  
✅ **Gemini API Key** (https://aistudio.google.com/app/apikeys)  
✅ **Gmail App Password** (for email verification)  
✅ **Google OAuth Client ID** (optional - https://console.cloud.google.com)  

---

## 🎯 Deployment Overview

```
┌──────────────┐
│ Your Forked  │
│   GitHub     │
│    Repo      │
└──────┬───────┘
       │
       ├────────────► Vercel (Frontend)
       │              - Deploy from /
       │              - Build: npm run build
       │              - Output: dist/
       │
       └────────────► Render (Backend)
                      - Deploy from /
                      - Build: npm run server:build
                      - Start: npm run server:start
```

---

## 🔧 Step 1: Prepare Your Repository

### Push Your Code to GitHub

If you haven't already pushed your changes:

```bash
cd d:\AI-SUM\AI-MED-1
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🎨 Step 2: Deploy Backend to Render

### A. Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (easiest option)
3. Authorize Render to access your repositories

### B. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your forked repository
3. Configure:

   **Basic Settings:**
   - **Name**: `ai-med-backend` (or any name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (deploy from root)
   - **Runtime**: `Node`
   
   **Build & Deploy:**
   - **Build Command**: 
     ```
     npm install && npm run server:build
     ```
   - **Start Command**: 
     ```
     npm run server:start
     ```

4. Click **"Advanced"** and add environment variables:

### C. Add Environment Variables

Click **"Add Environment Variable"** for each:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | production |
| `PORT` | `5000` | 5000 |
| `MONGODB_URI` | Your MongoDB Atlas connection string | mongodb+srv://username:password@cluster... |
| `JWT_SECRET` | Random secure string | your-super-secret-jwt-key-change-this |
| `GEMINI_API_KEY` | Your Gemini API key | AIzaSy... |
| `EMAIL_SERVICE` | `gmail` | gmail |
| `EMAIL_USER` | Your Gmail address | your-email@gmail.com |
| `EMAIL_PASSWORD` | Your Gmail App Password | abcd efgh ijkl mnop |
| `EMAIL_FROM` | Email display name | "AI-MED" <noreply@ai-med.com> |
| `FRONTEND_URL` | Will update after Vercel deployment | https://your-app.vercel.app |
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | 123456789-abc...apps.googleusercontent.com |

5. Click **"Create Web Service"**

### D. Get Your Backend URL

After deployment completes (5-10 minutes), you'll get a URL like:
```
https://ai-med-backend.onrender.com
```

**📝 Copy this URL - you'll need it for Vercel!**

---

## 🌐 Step 3: Deploy Frontend to Vercel

### A. Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### B. Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Select your forked repository
3. Configure:

   **Project Settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### C. Add Environment Variables

Click **"Environment Variables"** and add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Render backend URL + `/api` |
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |

**Example for `VITE_API_URL`:**
```
https://ai-med-backend.onrender.com/api
```

4. Click **"Deploy"**

### D. Get Your Frontend URL

After deployment (2-5 minutes), you'll get a URL like:
```
https://your-project.vercel.app
```

---

## 🔄 Step 4: Update Backend with Frontend URL

### Important: Update CORS Settings

1. Go back to **Render Dashboard**
2. Click on your **ai-med-backend** service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update it with your Vercel URL:
   ```
   https://your-project.vercel.app
   ```
6. Click **"Save Changes"**
7. Service will auto-redeploy

---

## 🔐 Step 5: Configure MongoDB Atlas

### Whitelist Render IP

1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's specific IPs if you want more security
5. Click **"Confirm"**

---

## 📧 Step 6: Set Up Gmail for Email Verification

### Generate App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click **"Security"** (left sidebar)
3. Enable **"2-Step Verification"** (if not already enabled)
4. After enabling 2FA, find **"App passwords"**
5. Select **"Mail"** and your device
6. Copy the 16-character password
7. Add it to Render's `EMAIL_PASSWORD` environment variable

---

## 🎨 Step 7: Configure Google OAuth (Optional)

If you want Google Sign-In:

### A. Create OAuth Credentials

1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Choose **"Web application"**

### B. Configure OAuth

**Authorized JavaScript origins:**
```
https://your-project.vercel.app
```

**Authorized redirect URIs:**
```
https://your-project.vercel.app
https://your-project.vercel.app/signin
https://your-project.vercel.app/signup
```

### C. Copy Client ID

1. Copy the Client ID
2. Add to **both** Vercel and Render:
   - Vercel: `VITE_GOOGLE_CLIENT_ID`
   - Render: `GOOGLE_CLIENT_ID`

---

## ✅ Step 8: Test Your Deployment

### Test Backend

Visit: `https://ai-med-backend.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-16T..."
}
```

### Test Frontend

1. Visit: `https://your-project.vercel.app`
2. Try to sign up
3. Check email verification works
4. Try Google Sign-In (if configured)
5. Test onboarding flow
6. Upload a medical report
7. Check symptom checker

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error

**Symptom**: Frontend can't connect to backend

**Solution**:
1. Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
2. No trailing slash in URLs
3. Redeploy backend after changing environment variables

### Issue 2: MongoDB Connection Failed

**Symptom**: 500 error when trying to register

**Solution**:
1. Check MongoDB Atlas → Network Access
2. Add 0.0.0.0/0 or Render IPs
3. Verify connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

### Issue 3: Email Verification Not Sending

**Symptom**: No verification email received

**Solution**:
1. Check spam folder
2. Verify Gmail credentials in Render
3. Ensure App Password (not regular password)
4. Check Render logs for email errors

### Issue 4: Google Sign-In Not Working

**Symptom**: Google login fails

**Solution**:
1. Verify OAuth Client ID matches in both platforms
2. Check authorized origins include Vercel URL
3. No trailing slashes in redirect URIs
4. Try clearing browser cache

### Issue 5: Build Fails on Vercel

**Symptom**: Deployment fails during build

**Solution**:
1. Check all environment variables are set
2. Verify `VITE_` prefix on frontend variables
3. Check build logs for specific errors
4. Ensure `vercel.json` is committed

### Issue 6: Backend Cold Start (Render Free Tier)

**Symptom**: First request after inactivity is slow

**Solution**:
- Render free tier sleeps after 15 minutes inactivity
- First request wakes it up (10-30 seconds delay)
- Consider upgrading to paid tier for always-on service
- Or use a cron job to ping every 10 minutes

---

## 🔄 Redeployment Process

### Update Frontend (Vercel)

Vercel auto-deploys on every git push to main:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```

### Update Backend (Render)

Render auto-deploys on every git push to main:
```bash
git add .
git commit -m "Update backend"
git push origin main
```

### Manual Redeploy

**Vercel**: Dashboard → Your Project → Deployments → Redeploy

**Render**: Dashboard → Your Service → Manual Deploy → Deploy latest commit

---

## 📊 Environment Variables Checklist

### Render (Backend) - 11 Variables

- [ ] NODE_ENV = production
- [ ] PORT = 5000
- [ ] MONGODB_URI = mongodb+srv://...
- [ ] JWT_SECRET = your-secret-key
- [ ] GEMINI_API_KEY = AIzaSy...
- [ ] EMAIL_SERVICE = gmail
- [ ] EMAIL_USER = your-email@gmail.com
- [ ] EMAIL_PASSWORD = 16-char-app-password
- [ ] EMAIL_FROM = "AI-MED" <noreply@...>
- [ ] FRONTEND_URL = https://your-app.vercel.app
- [ ] GOOGLE_CLIENT_ID = 123456789-...apps.googleusercontent.com

### Vercel (Frontend) - 2 Variables

- [ ] VITE_API_URL = https://your-backend.onrender.com/api
- [ ] VITE_GOOGLE_CLIENT_ID = 123456789-...apps.googleusercontent.com

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel (Free)**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Perfect for frontend

**Render (Free)**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Sleeps after 15 min inactivity
- ✅ Auto-wakes on request
- ✅ 100GB bandwidth/month
- ⚠️ Cold start delays (~10-30 seconds)

**MongoDB Atlas (Free - M0)**
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Enough for small-medium projects

**Total Monthly Cost**: **$0** 🎉

### Upgrade Path (Optional)

**Render Pro** ($7/month):
- Always-on (no cold starts)
- Better performance
- More resources

**Vercel Pro** ($20/month):
- Team features
- More bandwidth
- Advanced analytics

---

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] Test user registration
- [ ] Test email verification
- [ ] Test login (email & Google)
- [ ] Test onboarding flow
- [ ] Test report upload & OCR
- [ ] Test symptom checker
- [ ] Test medical history
- [ ] Check all images load
- [ ] Test responsive design (mobile)
- [ ] Check browser console for errors
- [ ] Test with different browsers
- [ ] Share link with friends for testing

---

## 📞 Support & Resources

### Documentation

- **Vercel**: https://vercel.com/docs
- **Render**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

### Community

- **Vercel Discord**: https://vercel.com/discord
- **Render Community**: https://community.render.com

### Your Deployed URLs

- **Frontend**: https://________.vercel.app
- **Backend**: https://________.onrender.com
- **GitHub Repo**: https://github.com/________/________

---

## 🚀 You're Live!

Congratulations! Your AI-MED platform is now deployed and accessible worldwide! 🎉

Share your project:
- Add the live URL to your GitHub README
- Share on social media
- Show to potential users/employers
- Add to your portfolio

---

**Deployment Date**: February 2026  
**Platform**: Vercel + Render  
**Status**: Production Ready ✅
