const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aiRoutes = require('./routes/aiRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Database Connection
connectDB();

// Security Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Resume Download Endpoint
app.get('/api/resume/download', (req, res) => {
  const resumeText = `
ADITYA RAJESH CHAVAN
Email: aadichavan8876@gmail.com | LinkedIn: aditya-chavan17 | GitHub: aadichavan8876 | Mobile: +91 7887460937

SUMMARY:
Motivated Computer Science student with strong foundation in .NET Core, Data Structures & Algorithms, and Backend Development. Experienced in building RESTful APIs using MySQL & SQL Server, with hands-on project and internship experience.

EDUCATION:
- Master of Science in Computer Applications (MSc CA) - Appearing
- Bachelor of Science in Computer Science (BSc CS) - 62%
- HSC Class XII - 81.33%
- SSC Class X - 75.60%

SKILLS:
- Languages: C, C++, Python, C#
- Backend: C#, ASP.NET, ASP.NET Core, Microservices
- Web Technologies: HTML, CSS, JavaScript, Bootstrap
- Databases: SQL Server, MySQL
- CS Fundamentals: DSA, DBMS, Operating Systems, Computer Networks
- Tools: Visual Studio, Git, GitHub
- Soft Skills: Communication, Teamwork, Problem Solving

EXPERIENCE / INTERNSHIP:
.NET Developer Intern | CodeReach Software Pvt Ltd (Duration: 6 Months)
- Assisted in developing web applications using ASP.NET and C#
- Worked with SQL Server databases & fixed bugs
- Supported senior developers & learned SDLC lifecycle

PROJECTS:
1. Employee Management System (ASP.NET, C#, SQL Server, ADO.NET)
2. Online Food Ordering System (ASP.NET Core, REST APIs, SQL Server)
3. Student Management System (C#, ASP.NET, SQL Server, OOP)

CERTIFICATIONS:
- ASP.NET & C# Development Certification
- SQL Server Fundamentals Certification
- Web Development Certification (HTML, CSS, JS)

CODING PROFILES:
- CodeChef (.NET)
- LeetCode (DSA Practice)
  `;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="Aditya_Rajesh_Chavan_Resume.txt"');
  res.send(resumeText);
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);

// About Summary API Endpoint
app.get('/api/about', (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Aditya Rajesh Chavan",
      title: ".NET Core, Backend & Full-Stack Developer",
      bio: "Motivated Computer Science student with strong foundation in .NET Core, Data Structures & Algorithms, and Backend Development.",
      email: "aadichavan8876@gmail.com",
      mobile: "+91 7887460937",
      linkedin: "aditya-chavan17",
      github: "aadichavan8876",
      education: [
        { degree: "Master of Science in Computer Applications (MSc CA)", status: "Appearing" },
        { degree: "Bachelor of Science in Computer Science (BSc CS)", percentage: "62%" },
        { degree: "Higher Secondary Certificate (HSC), Class XII", percentage: "81.33%" },
        { degree: "Secondary School Certificate (SSC), Class X", percentage: "75.60%" }
      ],
      internship: {
        role: ".NET Developer Intern",
        company: "CodeReach Software Pvt Ltd",
        duration: "6 Months",
        details: [
          "Assisted in developing web applications using ASP.NET and C#",
          "Worked with SQL Server databases and implemented database operations",
          "Fixed application bugs and conducted testing on application modules",
          "Supported senior developers and learned SDLC & debugging techniques"
        ]
      }
    }
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: "AI Developer Portfolio API is running smoothly." });
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
