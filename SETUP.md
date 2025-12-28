# 🚀 CipherSQLStudio Setup Guide

Complete setup instructions for running CipherSQLStudio locally and in production.

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **OpenAI API Key** (optional) - [Get API Key](https://platform.openai.com/api-keys)

## ⚡ Quick Start (5 minutes)

### 1. Clone and Install
```bash
git clone https://github.com/your-username/ciphersqlstudio.git
cd ciphersqlstudio

# Install all dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb ciphersqlstudio

# Run setup script
psql -d ciphersqlstudio -f server/db/setupPostgreSQL.sql
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example server/.env

# Edit server/.env with your settings:
# - Update POSTGRES_USER and POSTGRES_PASSWORD
# - Add your OpenAI API key (optional)
```

### 4. Start Application
```bash
# Terminal 1 - Backend (from project root)
cd server && npm run dev

# Terminal 2 - Frontend (from project root)  
cd client && npm start
```

🎉 **Done!** Visit `http://localhost:3000`

## 🔧 Detailed Setup

### PostgreSQL Setup

#### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql
brew services start postgresql

# Create database and user
createdb ciphersqlstudio
psql ciphersqlstudio

-- In PostgreSQL shell:
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ciphersqlstudio TO your_username;
\q
```

#### Option 2: Docker PostgreSQL
```bash
# Run PostgreSQL in Docker
docker run --name ciphersql-postgres \
  -e POSTGRES_DB=ciphersqlstudio \
  -e POSTGRES_USER=your_username \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:14
```

### Environment Variables

Create `server/.env` with these settings:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# PostgreSQL Configuration (Required)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ciphersqlstudio
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password

# MongoDB Configuration (Optional - has fallback)
MONGODB_URI=mongodb://localhost:27017/ciphersqlstudio

# OpenAI Configuration (Optional - has fallback)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Security
JWT_SECRET=your-secure-random-string
```

### Sample Data Setup

The application includes sample data that gets loaded automatically:

```bash
# Run the seed script (optional)
cd server
npm run seed
```

This creates sample tables with student and course data for SQL practice.

## 🧪 Testing the Setup

### 1. Test Backend API
```bash
# Test health endpoint
curl http://localhost:5001/api/health

# Test assignments endpoint
curl http://localhost:5001/api/assignments
```

### 2. Test Frontend
1. Visit `http://localhost:3000`
2. Click on any assignment
3. Try executing: `SELECT * FROM students;`
4. Test the hint system
5. Verify validation results appear

### 3. Test Database Connection
```bash
# Connect to PostgreSQL
psql -d ciphersqlstudio -U your_username

# Check tables exist
\dt

# Test sample query
SELECT * FROM students LIMIT 5;
```

## 🚨 Troubleshooting

### Common Issues

#### "Database connection failed"
```bash
# Check PostgreSQL is running
brew services list | grep postgresql
# or
sudo systemctl status postgresql

# Test connection manually
psql -h localhost -U your_username -d ciphersqlstudio
```

#### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

#### "OpenAI API quota exceeded"
- The app works without OpenAI - it uses intelligent fallback hints
- Check your OpenAI usage at [platform.openai.com](https://platform.openai.com/usage)
- Add billing information if needed

#### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for client and server directories
```

### Performance Issues

#### Slow assignment loading
- Check PostgreSQL connection
- Verify MongoDB connection (or use in-memory fallback)
- Check network connectivity

#### SQL queries timing out
- Increase timeout in `server/controllers/executeController.js`
- Check PostgreSQL performance
- Verify database indexes exist

## 🔒 Security Notes

### Development Security
- Never commit `.env` files to git
- Use strong passwords for database users
- Keep API keys secure

### Production Security
- Use environment variables for all secrets
- Enable SSL/HTTPS
- Use secure database connections
- Implement rate limiting
- Regular security updates

## 📁 Project Structure

```
ciphersqlstudio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components  
│   │   ├── styles/         # SCSS stylesheets
│   │   └── utils/          # API utilities
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── db/                # Database setup
│   └── .env               # Environment variables
├── .env.example           # Environment template
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # Main documentation
```

## 🎯 Next Steps

### For Development
1. Explore the codebase structure
2. Add new SQL assignments in `server/data/sampleAssignments.js`
3. Customize the UI in `client/src/styles/`
4. Add new API endpoints as needed

### For Production
1. Follow the [Deployment Guide](DEPLOYMENT.md)
2. Set up monitoring and logging
3. Configure backups
4. Set up CI/CD pipeline

## 🤝 Getting Help

### Documentation
- [README.md](README.md) - Main project documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide

### Support
- Check existing issues on GitHub
- Create new issue with detailed description
- Include error logs and environment details

### Contributing
- Fork the repository
- Create feature branch
- Submit pull request with tests

---

**Happy coding! 🚀 Start building amazing SQL learning experiences!**