# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

---

## 📝 Pre-Deployment Checklist

### Prerequisites Setup

- [ ] Created GitHub account
- [ ] Forked the AI-MED repository
- [ ] Pushed latest code to your forked repo
- [ ] Created Vercel account (https://vercel.com)
- [ ] Created Render account (https://render.com)
- [ ] Created MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- [ ] Set up MongoDB database and got connection string
- [ ] Generated Gemini API key (https://aistudio.google.com/app/apikeys)
- [ ] Generated Gmail App Password (https://myaccount.google.com/security)
- [ ] (Optional) Created Google OAuth credentials

---

## 🎯 Backend Deployment (Render)

### Step 1: Create Service
- [ ] Opened Render dashboard
- [ ] Clicked "New +" → "Web Service"
- [ ] Connected GitHub repository
- [ ] Selected correct repository

### Step 2: Configure Build
- [ ] Set Build Command: `npm install && npm run server:build`
- [ ] Set Start Command: `npm run server:start`
- [ ] Selected Region: ________________

### Step 3: Environment Variables
- [ ] Added `NODE_ENV=production`
- [ ] Added `PORT=5000`
- [ ] Added `MONGODB_URI=mongodb+srv://...`
- [ ] Added `JWT_SECRET=...`
- [ ] Added `GEMINI_API_KEY=...`
- [ ] Added `EMAIL_SERVICE=gmail`
- [ ] Added `EMAIL_USER=...`
- [ ] Added `EMAIL_PASSWORD=...`
- [ ] Added `EMAIL_FROM=...`
- [ ] Added `GOOGLE_CLIENT_ID=...` (if using Google auth)
- [ ] Left `FRONTEND_URL` empty (will update later)

### Step 4: Deploy
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment (5-10 minutes)
- [ ] Deployment successful
- [ ] Copied backend URL: https://________________.onrender.com

### Step 5: Test Backend
- [ ] Visited: https://________________.onrender.com/health
- [ ] Received healthy response with MongoDB connected

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Import Project
- [ ] Opened Vercel dashboard
- [ ] Clicked "Add New..." → "Project"
- [ ] Connected GitHub repository
- [ ] Selected correct repository

### Step 2: Configure Build
- [ ] Framework preset: Vite (auto-detected)
- [ ] Root Directory: `./` (default)
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `dist` (default)

### Step 3: Environment Variables
- [ ] Added `VITE_API_URL=https://________________.onrender.com/api`
- [ ] Added `VITE_GOOGLE_CLIENT_ID=...` (if using Google auth)

### Step 4: Deploy
- [ ] Clicked "Deploy"
- [ ] Waited for deployment (2-5 minutes)
- [ ] Deployment successful
- [ ] Copied frontend URL: https://________________.vercel.app

### Step 5: Test Frontend
- [ ] Visited: https://________________.vercel.app
- [ ] Page loads successfully
- [ ] No console errors

---

## 🔄 Final Configuration

### Update Backend CORS
- [ ] Went back to Render dashboard
- [ ] Clicked on backend service
- [ ] Went to "Environment" tab
- [ ] Updated `FRONTEND_URL=https://________________.vercel.app`
- [ ] Clicked "Save Changes"
- [ ] Service redeployed successfully

### Configure MongoDB Network Access
- [ ] Logged into MongoDB Atlas
- [ ] Went to "Network Access"
- [ ] Added IP address: 0.0.0.0/0 (allow all)
- [ ] Or added Render IP ranges specifically

---

## ✅ Testing & Validation

### Backend Tests
- [ ] Health endpoint works: `/health`
- [ ] MongoDB shows as "connected"
- [ ] No errors in Render logs

### Frontend Tests
- [ ] Home page loads
- [ ] Navigation works
- [ ] Images display correctly
- [ ] No 404 errors for assets

### Authentication Tests
- [ ] Can register new account
- [ ] Verification email received
- [ ] Can verify email (click link)
- [ ] Can login with verified account
- [ ] Remember Me checkbox works
- [ ] (Optional) Google Sign-In works

### Feature Tests
- [ ] Onboarding flow appears for new users
- [ ] Can complete onboarding form
- [ ] Profile data saves correctly
- [ ] Can upload medical report
- [ ] OCR extracts text from report
- [ ] AI analysis generates insights
- [ ] Symptom checker works
- [ ] Medical history displays
- [ ] Can view saved reports

### Responsive Tests
- [ ] Tested on mobile (Chrome DevTools)
- [ ] Tested on tablet view
- [ ] Bottom navigation works
- [ ] All pages responsive

### Browser Tests
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari (if available)
- [ ] Tested in Edge

---

## 🐛 Common Issues

### Issue: CORS Error
- [ ] Verified `FRONTEND_URL` matches Vercel URL exactly
- [ ] No trailing slash in either URL
- [ ] Backend redeployed after changing env var

### Issue: MongoDB Connection Failed
- [ ] Connection string format correct
- [ ] Username/password have no special chars or are URL-encoded
- [ ] Network access allows Render IPs or 0.0.0.0/0
- [ ] Database name specified in connection string

### Issue: Email Not Sending
- [ ] Gmail App Password used (not regular password)
- [ ] 2FA enabled on Gmail account
- [ ] Email credentials correct in Render
- [ ] Checked spam folder

### Issue: Google Auth Not Working
- [ ] OAuth Client ID correct in both Vercel and Render
- [ ] Authorized origins include Vercel URL
- [ ] Authorized redirect URIs include:
  - https://your-app.vercel.app
  - https://your-app.vercel.app/signin
  - https://your-app.vercel.app/signup
- [ ] No trailing slashes in OAuth config

---

## 📊 Deployment Info

### Your URLs
- **Live App**: https://________________.vercel.app
- **API Backend**: https://________________.onrender.com
- **GitHub Repo**: https://github.com/________________/________________

### Deployment Dates
- **Backend Deployed**: ________________
- **Frontend Deployed**: ________________
- **Last Updated**: ________________

### Account Info
- **Vercel Project Name**: ________________
- **Render Service Name**: ________________
- **MongoDB Cluster**: ________________

---

## 🎉 Post-Deployment

### Share Your Project
- [ ] Added live URL to GitHub README
- [ ] Updated project description on GitHub
- [ ] Shared on social media
- [ ] Added to portfolio
- [ ] Sent to friends for testing

### Monitor Your App
- [ ] Check Render logs for errors
- [ ] Check Vercel Analytics
- [ ] Monitor MongoDB usage
- [ ] Check API response times
- [ ] Review user feedback

### Next Steps
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up error tracking (Sentry)
- [ ] Add more features
- [ ] Improve performance
- [ ] Write blog post about your project

---

## 📞 Need Help?

- **Quick Guide**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- **Detailed Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Documentation**: [DOCUMENTATION.md](DOCUMENTATION.md)

---

**Deployment Status**: ⬜ Not Started | 🟡 In Progress | 🟢 Complete

**Mark as complete when all checkboxes are checked!** ✅
