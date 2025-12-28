# 🚀 Deployment Guide for CipherSQLStudio

This guide covers deploying CipherSQLStudio to production with GitHub Pages for the frontend and various options for the backend.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js and npm installed
- OpenAI API key (optional)
- PostgreSQL database (for backend)

## 🎯 Deployment Steps

### 1. Prepare Repository

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: CipherSQLStudio complete implementation"

# Create GitHub repository and push
git remote add origin https://github.com/your-username/ciphersqlstudio.git
git branch -M main
git push -u origin main
```

### 2. Frontend Deployment (GitHub Pages)

#### Update Configuration
1. Edit `client/package.json` and update the homepage URL:
```json
"homepage": "https://your-username.github.io/ciphersqlstudio"
```

2. Update API base URL for production in `client/src/utils/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api'  // Your deployed backend URL
  : process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
```

#### Deploy to GitHub Pages
```bash
cd client
npm run deploy
```

This will:
- Build the React app for production
- Deploy to GitHub Pages
- Make it available at `https://your-username.github.io/ciphersqlstudio`

### 3. Backend Deployment Options

#### Option A: Railway (Recommended)
1. Create account at [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard:
   ```
   PORT=5001
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   POSTGRES_HOST=your_postgres_host
   POSTGRES_PORT=5432
   POSTGRES_DB=ciphersqlstudio
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. Deploy from `server` directory

#### Option B: Heroku
1. Install Heroku CLI
2. Create Heroku app:
```bash
cd server
heroku create your-app-name
```
3. Add environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set POSTGRES_HOST=your_postgres_host
# ... add all other environment variables
```
4. Deploy:
```bash
git subtree push --prefix server heroku main
```

#### Option C: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. In server directory: `vercel`
3. Add environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### 4. Database Setup

#### PostgreSQL (Production)
Use a cloud PostgreSQL service:
- **Neon** (recommended for free tier)
- **Supabase** 
- **AWS RDS**
- **Google Cloud SQL**

Run the setup script on your production database:
```sql
-- Copy contents from server/db/setupPostgreSQL.sql
-- Execute on your production PostgreSQL instance
```

#### MongoDB (Production)
Use MongoDB Atlas:
1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string
3. Update `MONGODB_URI` in environment variables

### 5. Environment Variables Setup

#### Production Environment Variables
```env
# Server Configuration
PORT=5001
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ciphersqlstudio
POSTGRES_HOST=your-postgres-host.com
POSTGRES_PORT=5432
POSTGRES_DB=ciphersqlstudio
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_secure_password

# OpenAI Configuration
OPENAI_API_KEY=sk-your-real-openai-api-key

# Security
JWT_SECRET=your-very-secure-jwt-secret-key
```

### 6. CORS Configuration for Production

Update `server/app.js` CORS configuration:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-username.github.io'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
```

### 7. Testing Deployment

#### Frontend Testing
1. Visit `https://your-username.github.io/ciphersqlstudio`
2. Check that all pages load correctly
3. Verify responsive design on mobile devices

#### Backend Testing
1. Test API endpoints:
```bash
curl https://your-backend-url.com/api/health
curl https://your-backend-url.com/api/assignments
```

#### Full Integration Testing
1. Load assignments from deployed frontend
2. Execute SQL queries
3. Test hint generation
4. Verify validation system works

### 8. Monitoring and Maintenance

#### Performance Monitoring
- Monitor API response times
- Check database query performance
- Monitor OpenAI API usage and costs

#### Error Tracking
- Set up error logging (e.g., Sentry)
- Monitor server logs
- Track user feedback

#### Updates and Maintenance
```bash
# Update deployment
git add .
git commit -m "Update: description of changes"
git push origin main

# Redeploy frontend
cd client && npm run deploy

# Backend will auto-deploy if using Railway/Vercel
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Update CORS configuration in backend
2. **API Not Found**: Check API base URL in frontend
3. **Database Connection**: Verify connection strings and credentials
4. **Build Failures**: Check Node.js version compatibility

### Performance Optimization

1. **Frontend**:
   - Enable gzip compression
   - Optimize images and assets
   - Use React.lazy for code splitting

2. **Backend**:
   - Add database indexes
   - Implement caching (Redis)
   - Use connection pooling

## 📊 Production Checklist

- [ ] Frontend deployed to GitHub Pages
- [ ] Backend deployed to cloud service
- [ ] Production databases configured
- [ ] Environment variables set
- [ ] CORS configured for production
- [ ] SSL certificates enabled
- [ ] Error monitoring set up
- [ ] Performance monitoring enabled
- [ ] Backup strategy implemented

## 🎉 Success!

Your CipherSQLStudio is now live and ready for users to learn SQL interactively!

**Frontend**: `https://your-username.github.io/ciphersqlstudio`
**Backend**: `https://your-backend-url.com`

Share your deployed application and help others learn SQL! 🚀