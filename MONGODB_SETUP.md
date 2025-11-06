# MongoDB Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

## Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service

### Verify Installation
```bash
mongod --version
```

## MongoDB Atlas (Cloud) Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" and get your connection string
5. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical-reports
   ```

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update the MongoDB URI:
```bash
MONGODB_URI=mongodb://localhost:27017/medical-reports
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB (if using local)
MongoDB should be running as a service. If not:
```bash
mongod
```

### 4. Start the Backend Server
```bash
npm run server
```

### 5. Start the Frontend (in a new terminal)
```bash
npm run dev
```

## API Endpoints

### Reports
- `POST /api/reports` - Create a new report
- `GET /api/reports/user/:userId` - Get all reports for a user
- `GET /api/reports/:id` - Get a single report
- `PUT /api/reports/:id` - Update a report
- `DELETE /api/reports/:id` - Delete a report

## Database Schema

### Report Collection
```javascript
{
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
  }
}
```

## Testing the API

You can test the API using curl or Postman:

```bash
# Create a report
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "demo-user",
    "fileName": "blood-test.pdf",
    "fileType": "pdf",
    "extractedText": "Blood test results...",
    "summary": "All values normal",
    "parameters": [
      {"name": "Hemoglobin", "value": "15.2 g/dL", "status": "normal"}
    ]
  }'

# Get user reports
curl http://localhost:5000/api/reports/user/demo-user
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network access (for Atlas)

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using the port

### CORS Issues
- Ensure the frontend URL is allowed in CORS configuration
- Check that VITE_API_URL matches the backend URL
