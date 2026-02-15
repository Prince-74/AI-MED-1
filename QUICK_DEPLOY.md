# ⚡ Quick Deploy Reference

## 🎯 1️⃣ Deploy Backend to Render (5 minutes)

1. **Go to**: https://render.com → Sign up with GitHub
2. **New Web Service** → Select your forked repo
3. **Configure**:
   - Build Command: `npm install && npm run server:build`
   - Start Command: `npm run server:start`
   - Add these environment variables:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=mongodb+srv://... (your MongoDB Atlas URL)
     JWT_SECRET=your-secret-key-here
     GEMINI_API_KEY=AIzaSy... (from Google AI Studio)
     EMAIL_SERVICE=gmail
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=xxxx xxxx xxxx xxxx (Gmail App Password)
     EMAIL_FROM="AI-MED" <noreply@ai-med.com>
     FRONTEND_URL= (leave empty for now)
     GOOGLE_CLIENT_ID= (your Google OAuth Client ID)
     ```
4. **Deploy** → Copy your backend URL: `https://your-app.onrender.com`

---

## 🎯 2️⃣ Deploy Frontend to Vercel (3 minutes)

1. **Go to**: https://vercel.com → Sign up with GitHub
2. **New Project** → Select your forked repo
3. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-app.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```
4. **Deploy** → Copy your frontend URL: `https://your-app.vercel.app`

---

## 🎯 3️⃣ Final Step - Update Backend (1 minute)

1. Go back to **Render Dashboard**
2. Click your service → **Environment**
3. Update `FRONTEND_URL` to: `https://your-app.vercel.app`
4. **Save** (auto-redeploys)

---

## ✅ Done!

Visit your app: `https://your-app.vercel.app`

📖 **Need detailed help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🔑 Quick Links

- **Gmail App Password**: https://myaccount.google.com/security
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Gemini API Key**: https://aistudio.google.com/app/apikeys
- **Google OAuth**: https://console.cloud.google.com

---

## 🐛 Troubleshooting

**CORS Error?** → Check `FRONTEND_URL` in Render matches Vercel URL exactly

**Can't connect to DB?** → MongoDB Atlas → Network Access → Add 0.0.0.0/0

**No emails?** → Use Gmail App Password, not your regular password

**Google login fails?** → Check OAuth redirect URIs include your Vercel URL
