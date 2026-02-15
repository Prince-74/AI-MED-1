# 🏥 AI-MED - Clinical Decision Support System

AI-MED is a clinical decision-support tool that uses patient history and medical risk analysis to generate structured, doctor-ready reports. It assists healthcare professionals with faster initial assessment, consistent record evaluation, and improved patient communication.

**📚 For complete documentation, see [DOCUMENTATION.md](DOCUMENTATION.md)**

---

## 🎯 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or cloud)
- npm or bun

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (.env):**
   ```bash
   MONGODB_URI=mongodb+srv://your-uri
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

3. **Run the application:**
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

4. **Open in browser:**
   🌐 http://localhost:8080

---

## ✨ Key Features

- ✅ **Authentication System** - Secure user registration & login with JWT
- ✅ **Email Verification** - Automatic email verification on signup
- ✅ **Medical Report OCR** - Extract text from medical documents (PDF/Image)
- ✅ **Report Analysis** - Analyze medical reports with AI
- ✅ **Symptom Checker** - AI-powered symptom analysis
- ✅ **Medical History** - Track and analyze patient history
- ✅ **Remember Me** - Persistent login functionality
- ✅ **Health Records** - Save and manage medical reports

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | MongoDB Atlas (Cloud) |
| **AI** | Google Gemini API |
| **OCR** | Tesseract.js |
| **Auth** | JWT + bcryptjs |

---

## � Deploy to Production

Want to deploy your forked project?

**⚡ Quick Deploy (9 minutes):**
1. **Backend** → [Render.com](https://render.com) - See [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
2. **Frontend** → [Vercel.com](https://vercel.com) - See [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

**📖 Detailed Guide:**
- Complete step-by-step: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Environment variables checklist included
- Troubleshooting for common issues
- 100% Free tier deployment available

---

## �📖 Documentation

Complete documentation available in [DOCUMENTATION.md](DOCUMENTATION.md) including:

- **Setup & Installation** - Detailed setup instructions
- **Features** - Complete feature descriptions
- **API Endpoints** - All available endpoints
- **Database Schema** - Data structure documentation
- **Troubleshooting** - Common issues & solutions
- **Development Guide** - How to extend the project

---

## 🚀 Available Commands

```bash
npm run dev              # Start frontend dev server
npm run server          # Start backend with auto-reload
npm run build           # Build frontend for production
npm run server:build    # Compile TypeScript server
npm run server:start    # Run compiled server
npm run lint            # Run ESLint
```

---

## 📋 API Endpoints Summary

| Category | Endpoint | Method |
|----------|----------|--------|
| **Auth** | `/api/auth/register` | POST |
| | `/api/auth/login` | POST |
| | `/api/auth/verify-email/:token` | GET |
| **Reports** | `/api/reports` | POST |
| | `/api/reports/user/:userId` | GET |
| **OCR** | `/api/ocr` | POST |
| **Symptoms** | `/api/symptoms/analyze` | POST |

See [DOCUMENTATION.md](DOCUMENTATION.md) for complete API reference.

---

## 🔐 Security Features

- Bcrypt password hashing
- JWT token-based authentication
- Email verification system
- Remember Me with secure storage
- AuthGuard for protected routes
- CORS protection
- Input validation
- Rate limiting ready

---

## ⚠️ Important Disclaimer

**AI-MED is an assistive tool and must NOT be used as a sole basis for medical diagnosis or treatment.**

This system is designed to:
- ✅ Support healthcare professionals
- ✅ Provide information only
- ✅ Assist in faster assessments

This system is NOT designed to:
- ❌ Replace professional medical judgment
- ❌ Provide definitive diagnoses
- ❌ Override medical expertise

**Always consult qualified healthcare providers for medical decisions.**

---

## 📞 Support

- 📚 Read [DOCUMENTATION.md](DOCUMENTATION.md) for detailed guidance
- 🐛 Check troubleshooting section for common issues
- 💻 Review browser console and server logs for errors

---

## 📄 License

To be defined (MIT recommended).

---

**Status**: ✅ Production Ready | **Version**: 1.0 | **Last Updated**: February 2026
