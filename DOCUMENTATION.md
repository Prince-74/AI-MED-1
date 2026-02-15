# 📋 AI-MED Complete System Documentation

**Date Updated**: February 2026  
**Status**: ✅ All systems operational and documented

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [System Status](#system-status)
3. [Setup & Installation](#setup--installation)
4. [Features](#features)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Development Guide](#development-guide)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

### What is AI-MED?

AI-MED is a clinical decision-support tool that uses patient history and medical risk analysis to generate structured, doctor-ready reports. It aims to assist healthcare professionals with faster initial assessment, consistent record evaluation, and improved patient communication.

### Objective

Reduce the manual workload in reviewing patient history by using AI to:

- Extract key clinical details from structured/unstructured inputs
- Assess potential health risks based on standard medical guidelines
- Provide a concise summary and handout for doctors and patients

**Note**: This is not a diagnostic engine. It is an assistive information system to support clinical workflows.

### Key Features

- **Patient record ingestion**: symptoms, vitals, medications, medical history
- **Rule-based and ML-based risk scoring**: expandable with evidence-based models
- **Doctor-friendly summary** including critical warnings, suggested areas of examination, relevant historical patterns
- **Exportable handouts**: as PDFs or data objects
- **Modular architecture**: for integrating EHR or hospital systems later

### Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB Atlas (Cloud)
- **AI**: Google Gemini API for analysis
- **OCR**: Tesseract.js for document text extraction
- **Authentication**: JWT tokens with bcryptjs

---

## System Status

### Current Status ✅

| Component | Status | Port | Notes |
|-----------|--------|------|-------|
| **Backend Server** | Running ✅ | 5000 | API endpoints active |
| **Frontend Application** | Running ✅ | 8080 | Vite dev server |
| **Database** | Connected ✅ | - | MongoDB Atlas (Cloud) |
| **Health Check** | Available ✅ | 5000/health | Verify via URL |

### Implemented Features

- ✅ User Authentication (Registration, Login, JWT)
- ✅ Email Verification System
- ✅ Medical Report Analysis with OCR
- ✅ Dynamic Report Parameters
- ✅ Symptom Checker with AI Analysis
- ✅ Medical History Integration
- ✅ Health Records Management
- ✅ Remember Me Functionality
- ✅ Proper Routing & 404 Handling

---

## Setup & Installation

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** Atlas account (for cloud) OR local MongoDB installation
- **npm** or **bun** package manager
- **Git** (optional, for version control)

### Installation Steps

#### 1. Clone and Navigate
```bash
cd d:\AI-SUM\AI-MED-1
```

#### 2. Install Dependencies
```bash
npm install
# OR if using bun:
bun install
```

#### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update values:
```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical-reports
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:8080

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Service
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM="Medical App" <noreply@medicalapp.com>

# AI Services
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-2.0-flash-exp
```

#### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
mongod  # Start MongoDB service
```

**Option B: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### 5. Email Service Setup

**Gmail (Development/Testing)**
1. Enable 2-Factor Authentication on Google Account
2. Generate App Password:
   - Go to Security → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Add to `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

#### 6. Get Gemini API Key

1. Go to https://aistudio.google.com/app/apikeys
2. Create new API key
3. Add to `.env`: `GEMINI_API_KEY=your-key`

#### 7. Run the Application

**Terminal 1 - Backend Server**
```bash
npm run server
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend (in new terminal)**
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

#### 8. Access the Application

Open browser: **http://localhost:8080**

---

## Features

### 1. Authentication System ✅

#### What's Implemented
- User registration with email and password
- Login with JWT token generation
- Password hashing with bcryptjs (bcrypt)
- Token validation and automatic refresh
- Profile management
- Secure logout

#### How to Use
1. Go to `/signup` to register
2. Fill in: First Name, Last Name, Email, Password
3. Submit and get auto-redirected to home
4. Back to `/signin` to login with existing account

#### Security Features
- Minimum 6-character passwords
- Bcrypt hashing with 10 salt rounds
- 7-day token expiration
- Secure token storage
- Automatic session management

---

### 2. Email Verification System ✅

#### What's Implemented
- Email verification on registration
- Verification token generation (32-byte hex)
- 1-hour token expiration
- Resend verification functionality
- Login blocking for unverified users
- Professional email templates

#### Setup Instructions

**Gmail Configuration:**
1. Enable 2FA on Google Account
2. Generate App Password (Security → App passwords)
3. Add to `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM="Medical App" <noreply@medicalapp.com>
   ```

#### How It Works
1. User registers → Verification email sent
2. User clicks link in email → Email verified
3. User can now login
4. If not verified → Cannot login, can resend email

#### Test Endpoints
- `POST /api/auth/register` - Create new user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/resend-verification` - Resend email
- `POST /api/auth/login` - Login (requires verified email)

---

### 3. Medical Report Analysis & OCR ✅

#### What's Implemented
- Real OCR using Tesseract.js
- PDF and image file support
- Medical content validation
- Automatic parameter extraction
- Confidence scoring
- Strict non-medical document detection

#### How It Works
1. User uploads medical report (PDF/Image)
2. Backend performs OCR text extraction
3. System analyzes for medical keywords
4. Extracts medical parameters (hemoglobin, BP, etc.)
5. Returns structured medical data

#### Key Features
- **Medical Document Detection**: Requires ≥2 medical keywords
- **Multiple Report Types Supported**:
  - Blood Test Reports
  - Urine Analysis
  - Lipid Profiles
  - X-Ray Reports
  - CT/MRI Reports
  - Pathology Reports
  - General Medical Documents

#### Upload Requirements
- Supported formats: JPEG, PNG, PDF
- Max file size: 10MB
- Clear document scans for best accuracy

#### Example Response
```json
{
  "status": "medical_document",
  "text": "Complete Blood Count...",
  "ocrConfidence": 92,
  "medicalConfidence": 0.8,
  "reportType": "Blood Test Report",
  "parameters": [
    {"name": "Hemoglobin", "value": "14.2 g/dL", "status": "normal"},
    {"name": "WBC Count", "value": "6,800/μL", "status": "normal"}
  ],
  "foundKeywords": ["blood", "hemoglobin", "count"],
  "keywordCount": 15
}
```

#### Non-Medical Document Response
```json
{
  "status": "not_medical_document",
  "rawText": "Extracted text...",
  "ocrConfidence": 85,
  "medicalConfidence": 0.0,
  "keywordCount": 0,
  "foundKeywords": []
}
```

---

### 4. Dynamic Medical Report Analysis ✅

#### What's Improved
- No more hardcoded patient names (uses logged-in user)
- No more fake parameters (extracts from actual content)
- Contextual summaries based on report type
- Filename-based report type detection
- Realistic variations in test values

#### Filename-Based Analysis

The system analyzes filenames to determine report type:

| Filename Keywords | Report Type | Parameters |
|-------------------|------------|------------|
| blood, cbc, hemoglobin | Blood Test | CBC parameters |
| urine, urinalysis | Urine Test | Urinalysis parameters |
| lipid, cholesterol | Lipid Profile | Cholesterol values |
| xray, chest, x-ray | X-Ray Report | Radiological findings |
| Other files | Generic Report | Vital signs |

#### Dynamic Features
- ✅ Real user name from authentication
- ✅ Actual extracted parameters (no fabrication)
- ✅ Context-aware summaries
- ✅ Appropriate reference ranges
- ✅ Professional medical terminology

---

### 5. Symptom Checker ✅

#### What's Implemented
- AI-powered symptom analysis
- Natural language input (user types symptoms)
- Intelligent condition detection
- Urgency level assessment (Low/Medium/High)
- Personalized recommendations
- Medical history integration (if available)
- Comprehensive medical disclaimers

#### How It Works
1. User goes to `/symptom-checker`
2. Types symptoms in natural language
   - Example: "I have a fever, headache, and sore throat for 2 days"
3. Click "Analyze Symptoms"
4. AI analyzes and returns:
   - Possible medical conditions
   - Urgency level with color-coding 🚨⚠️ℹ️
   - Actionable recommendations
   - Medical disclaimer

#### Urgency Levels

| Level | Color | Meaning | Action |
|-------|-------|---------|--------|
| **High** | 🔴 Red | Immediate medical attention | Call 911 |
| **Medium** | 🟡 Yellow | Consult doctor soon | Schedule appointment |
| **Low** | 🟢 Green | Monitor and rest | Self-care |

#### Example Conditions Detected

**Chest pain + Shortness of breath**
→ Possible Cardiac Event → **High Urgency**

**Fever + Cough + Sore Throat**
→ Respiratory Infection → **Medium Urgency**

**Nausea + Vomiting + Diarrhea**
→ Gastroenteritis → **Medium Urgency**

**Isolated fatigue**
→ General Fatigue → **Low Urgency**

#### Medical Disclaimer
Clear disclaimer on every analysis stating:
- Not a substitute for professional medical advice
- Informational purposes only
- Emergency service guidance included
- Always consult healthcare providers

---

### 6. Medical History Integration ✅

#### What's Implemented
- Automatic medical history retrieval
- Integration with symptom analysis
- Recurring symptom pattern detection
- AI analysis considers patient's medical context
- Personalized recommendations based on history

#### How It Works
When analyzing symptoms:
1. System retrieves 5 most recent medical reports
2. Fetches symptom logs from last 30 days
3. Extracts abnormal parameters and patterns
4. Sends history context to AI
5. AI provides personalized analysis

#### Use Cases

**Chronic Condition Monitoring**
- User with diabetes reports fatigue
- System considers past high glucose levels
- Provides diabetes-specific recommendations

**Recurring Issues**
- User had respiratory infections previously
- Current cough analyzed in that context
- Suggests monitor for chronic respiratory issues

**Medication Side Effects**
- Past reports show medication prescriptions
- Current symptoms analyzed against medications
- AI identifies potential side effects

**Symptom Patterns**
- User logged "headache" 5 times in last month
- Reports headache again
- AI recognizes chronic pattern

---

### 7. Report Analyzer ✅

#### Features
- Upload medical documents (PDF/Image)
- Real-time OCR processing
- Automatic medical content detection
- Parameter extraction and analysis
- Save reports to Health Records
- View report history

#### Workflow
1. Upload file → OCR processes
2. System detects medical content
3. Extracts key parameters
4. Display results with confidence score
5. Save to database (linked to user)

#### User Profile Integration
- Reports linked to logged-in user
- User's name appears in report
- Medical history available for context
- Can download/share reports

---

### 8. Remember Me Functionality ✅

#### What's Implemented
- Remember Me checkbox on login
- Persistent vs session-based storage
- Automatic login on app startup
- Smart storage strategy
- Secure logout

#### How It Works

**With Remember Me Checked** ✅
- Token stored in localStorage (persists across browser closes)
- User stays logged in after browser restart
- Survives browser removal of session data

**Without Remember Me** ❌
- Token stored in sessionStorage (temporary)
- User logged out when browser closes
- More secure for shared computers

#### Testing

**Test 1: Remember Me ON**
1. Login with "Remember Me" checked
2. Close browser completely
3. Reopen browser → Should be logged in

**Test 2: Remember Me OFF**
1. Login without checking "Remember Me"
2. Close browser completely
3. Reopen browser → Should see login page

---

### 9. Proper Routing & 404 Handling ✅

#### What's Fixed
- Distinction between "Page not found" and "Not authorized"
- 404 pages don't trigger auth redirects
- Authenticated users can see 404 pages
- Smart routing based on auth status
- Seamless navigation experience

#### Route Structure

**Public Routes** (No Authentication Required):
- `/` - Welcome page
- `/signin` - Sign in
- `/signup` - Sign up
- `*` - 404 NotFound page

**Protected Routes** (Requires Authentication):
- `/home` - Dashboard
- `/profile` - User profile
- `/report-analyzer` - Medical reports
- `/health-records` - Saved reports
- `/symptom-checker` - Symptom analysis
- All other authenticated-only pages

#### 404 Handling
- Shows 404 page for unknown routes
- "Go to Home" button routes appropriately:
  - Logged-in users → `/home`
  - Guests → `/`
- No automatic redirects to login

---

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/verify-email/:token` | Verify email | No |
| POST | `/api/auth/resend-verification` | Resend verification email | No |

### Report Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/reports` | Create new report | Yes |
| GET | `/api/reports/user/:userId` | Get all reports for user | Yes |
| GET | `/api/reports/:id` | Get single report | Yes |
| PUT | `/api/reports/:id` | Update report | Yes |
| DELETE | `/api/reports/:id` | Delete report | Yes |

### OCR Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ocr` | Upload and process document | Yes |
| GET | `/api/ocr/health` | Check OCR service status | No |

### Symptom Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/symptoms/analyze` | Analyze symptoms | Yes |
| GET | `/api/symptoms/logs/:userId` | Get symptom history | Yes |
| POST | `/api/symptoms/logs` | Log new symptoms | Yes |

### Health Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Health check | No |

---

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  firstName: String,
  lastName: String,
  password: String (bcrypt hashed),
  isVerified: Boolean (default: false),
  verificationToken: String,
  verificationExpires: Date,
  emailVerifiedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Report Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  fileName: String,
  fileType: String,
  uploadDate: Date,
  extractedText: String,
  summary: String,
  parameters: [{
    name: String,
    value: String,
    status: 'normal' | 'abnormal' | 'critical',
    unit: String
  }],
  metadata: {
    reportDate: Date,
    patientName: String,
    doctorName: String,
    labName: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### SymptomLog Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  symptoms: String,
  duration: String,
  severity: String,
  notes: String,
  analysis: {
    possibleConditions: String[],
    urgency: 'low' | 'medium' | 'high',
    recommendations: String[]
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Development Guide

### Available npm Scripts

```bash
# Development
npm run dev              # Start Vite dev server (frontend)
npm run server          # Start Node.js backend with auto-reload
npm run build           # Build frontend for production
npm run build:dev       # Build frontend in development mode

# Production
npm run server:build    # Compile TypeScript server
npm run server:start    # Run compiled server

# Code Quality
npm run lint            # Run ESLint
npm run preview         # Preview production build locally
```

### Project Structure

```
AI-MED-1/
├── src/                          # Frontend (React/TypeScript)
│   ├── components/               # Reusable components
│   ├── pages/                    # Page components
│   ├── services/                 # API services
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities
│   ├── data/                     # Static data
│   └── App.tsx                   # Main app component
│
├── server/                       # Backend (Node.js/Express)
│   ├── routes/                   # API routes
│   ├── services/                 # Business logic
│   ├── models/                   # Data models
│   ├── middleware/               # Express middleware
│   ├── config/                   # Configuration
│   └── index.ts                  # Server entry point
│
├── public/                       # Static files
├── Datasets/                     # Data files
├── uploads/                      # Temporary uploads folder
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

### Adding New Features

#### Step 1: Create Backend Route
```typescript
// server/routes/newFeature.ts
import { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

#### Step 2: Register Route
```typescript
// server/index.ts
import newFeatureRouter from './routes/newFeature';
app.use('/api/new-feature', newFeatureRouter);
```

#### Step 3: Create Frontend Service
```typescript
// src/services/newFeatureService.ts
export const analyzeNewFeature = async (data: any) => {
  const response = await fetch('/api/new-feature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

#### Step 4: Use in Component
```typescript
// src/pages/NewFeature.tsx
import { analyzeNewFeature } from '@/services/newFeatureService';

export default function NewFeature() {
  const handleClick = async () => {
    const result = await analyzeNewFeature(data);
    console.log(result);
  };
  
  return <button onClick={handleClick}>Analyze</button>;
}
```

### Debugging

#### Frontend Issues
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Use React DevTools Extension

#### Backend Issues
1. Check server terminal output
2. Look for error messages
3. Use `console.log()` for debugging
4. Check MongoDB connection

#### Common Issues

**CORS Error**
- Check that backend is running
- Verify `VITE_API_URL` in `.env`
- Ensure header includes `Content-Type`

**JWT Error**
- Check token in localStorage/sessionStorage
- Verify `JWT_SECRET` in `.env`
- Try logging out and back in

**Database Error**
- Verify `MONGODB_URI` in `.env`
- Check MongoDB Atlas access
- Ensure IP is whitelisted

---

## Troubleshooting

### Setup Issues

#### "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

#### "Port already in use"
```bash
# Change port in .env
PORT=5001  # Or another available port
```

#### "Cannot connect to MongoDB"
**Solutions:**
1. Verify cluster is running (MongoDB Atlas)
2. Check IP is whitelisted (MongoDB Atlas → Security)
3. Verify connection string format
4. Check firewall settings

### Authentication Issues

#### "Invalid JWT token"
- Check `JWT_SECRET` is set in `.env`
- Try logging out and back in
- Clear browser storage: F12 → Application → Clear

#### "Cannot verify email"
- Check email credentials in `.env`
- For Gmail: Ensure App Password (not regular password)
- Check spam folder
- Try resending verification

#### "Still asking to login"
- Check Application tab (DevTools)
- Verify token in localStorage or sessionStorage
- Clear storage and log back in

### Report Issues

#### "OCR returns low confidence"
- Ensure document is clear and legible
- Try photographing document with better lighting
- Try PDF instead of image
- Check file is not corrupted

#### "Not detected as medical document"
- Document must have 2+ medical keywords
- Check extracted text in console
- Verify file is actual medical document
- Try different medical document

#### "Parameters not extracted"
- Document may not contain standard parameters
- System looks for common medical values (Hemoglobin, BP, etc.)
- Try with actual medical report
- Check console for extracted text

### Email Verification Issues

#### "Email not Received"
1. Check spam folder
2. Verify email address
3. For Gmail: Use App Password (not regular password)
4. Check development console for errors

#### "Invalid verification token"
- Token expired (1-hour expiration)
- Go to `/resend-verification`
- Request new verification email

### Performance Issues

#### "App loading slowly"
- Check internet connection
- Verify backend is running
- Check for network errors (DevTools > Network)
- Try clearing browser cache

#### "OCR taking too long"
- Large PDFs take longer (5-30 seconds)
- High-quality images process slower
- Try with smaller file or simpler document

---

## Notes for Future Development

### Planned Features
- [ ] File upload functionality (multer)
- [ ] Real AI analysis integration (extended)
- [ ] Report export to PDF
- [ ] Email sharing functionality
- [ ] Medication history tracking
- [ ] Wearable device integration
- [ ] Multi-language support
- [ ] Telemedicine integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app version

### Security Considerations
- [ ] Rate limiting for auth endpoints
- [ ] HTTPS enforcement (production)
- [ ] HIPAA/GDPR compliance
- [ ] Data encryption at rest
- [ ] Two-factor authentication
- [ ] Session timeout on inactivity
- [ ] Input validation and sanitization

### Performance Optimizations
- [ ] Implement caching strategy
- [ ] Optimize image delivery
- [ ] Code splitting strategy
- [ ] Database indexing
- [ ] API response compression
- [ ] Frontend lazy loading

---

## Roadmap

| Milestone | Status | Timeline |
|-----------|--------|----------|
| Core Authentication | ✅ Complete | ✅ |
| Email Verification | ✅ Complete | ✅ |
| OCR Implementation | ✅ Complete | ✅ |
| Report Analysis | ✅ Complete | ✅ |
| Symptom Checker | ✅ Complete | ✅ |
| Medical History | ✅ Complete | ✅ |
| PDF Export | 📋 Planned | Q1 2026 |
| Mobile App | 📋 Planned | Q2 2026 |
| Telemedicine | 📋 Planned | Q3 2026 |
| HIPAA Certification | 📋 Planned | Q4 2026 |

---

## Support & Contact

For issues, suggestions, or questions:

1. Check this documentation first
2. Review the troubleshooting section
3. Check browser console for errors
4. Check backend server logs
5. Verify all environment variables

---

## Disclaimer

**AI-MED is an assistive tool and must not be used as a sole basis for medical diagnosis or treatment.**

This system is designed to:
- Support healthcare professionals
- Provide information only
- Assist in faster assessments
- Improve documentation

This system is NOT designed to:
- Replace professional medical judgment
- Provide definitive diagnoses
- Override medical expertise
- Be used without professional review

**Always consult qualified healthcare providers for medical decisions.**

---

**Last Updated**: February 16, 2026  
**Version**: 1.0  
**Status**: Production Ready ✅
