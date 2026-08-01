const Project = require('../models/Project');

const initialProjects = [
  {
    _id: "1",
    title: "Employee Management System",
    description: "Web-based Employee Management System built with ASP.NET & C# to manage employee records efficiently, offering full CRUD operations, SQL Server connectivity via ADO.NET, role-based security, and responsive UI.",
    techStack: ["ASP.NET", "C#", "SQL Server", "ADO.NET", "HTML", "CSS", "JavaScript", "Bootstrap"],
    features: [
      "Role-based authentication & employee profile access",
      "Full CRUD operations for adding, updating, deleting employee records",
      "ADO.NET integration for high-performance SQL Server operations",
      "Responsive user interface styled with HTML, CSS & Bootstrap"
    ],
    challenges: [
      "Implementing efficient ADO.NET data access without Object Relational Mapping",
      "Managing session state and security permissions for administrative operations"
    ],
    futureImprovements: [
      "Migration to ASP.NET Core Web API with Entity Framework Core",
      "Integration with automated payroll module"
    ],
    githubUrl: "https://github.com/aadichavan8876",
    liveDemoUrl: "https://employee-mgmt-system-demo.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    architecture: "Three-tier Architecture (Presentation Layer, Business Logic Layer, Data Access Layer via ADO.NET)",
    databaseDesign: "Normalized SQL Server database containing Employee, Department, Role, and Audit Log tables."
  },
  {
    _id: "2",
    title: "Online Food Ordering System",
    description: "Full-fledged online food ordering web application using ASP.NET Core with restaurant menu management, cart order processing, tracking features, and high-performance REST APIs.",
    techStack: ["ASP.NET Core", "C#", "SQL Server", "REST APIs", "Bootstrap", "JavaScript"],
    features: [
      "Interactive restaurant menu management & dynamic cart processing",
      "RESTful API endpoints for handling customer orders & status tracking",
      "SQL Server database integration with transaction support",
      "Optimized responsiveness & performance via ASP.NET Core framework"
    ],
    challenges: [
      "Handling real-time order state updates across multiple REST endpoints",
      "Preventing concurrent order inventory race conditions"
    ],
    futureImprovements: [
      "Integration with payment gateway (Stripe / Razorpay)",
      "Real-time delivery driver tracking via WebSockets"
    ],
    githubUrl: "https://github.com/aadichavan8876",
    liveDemoUrl: "https://food-ordering-system-demo.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
    architecture: "ASP.NET Core Web API + Frontend Client Architecture with REST endpoints.",
    databaseDesign: "SQL Server relational model with Orders, Customers, MenuItems, and Payments tables."
  },
  {
    _id: "3",
    title: "Student Management System",
    description: "Robust application built with C# and ASP.NET to manage student information, attendance records, course registrations, and exam results utilizing Object-Oriented Programming and database normalization.",
    techStack: ["C#", "ASP.NET", "SQL Server", "OOP", "Database Normalization"],
    features: [
      "Student registration, course enrollment & result management modules",
      "Secure login & data validation mechanisms",
      "SQL Server backend for storing and retrieving student details",
      "Applied OOP principles (Inheritance, Encapsulation, Polymorphism)"
    ],
    challenges: [
      "Designing a 3NF normalized schema for handling complex student course relationships",
      "Implementing strict input validation on frontend & backend forms"
    ],
    futureImprovements: [
      "Automated report card PDF generation & email dispatch to students",
      "Student analytics portal with GPA progress graphs"
    ],
    githubUrl: "https://github.com/aadichavan8876",
    liveDemoUrl: "https://student-mgmt-demo.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    architecture: "Object-Oriented C# Layered System with Data Normalization.",
    databaseDesign: "3NF Normalized SQL Database with Students, Courses, Attendance, and Marks tables."
  }
];

const getProjects = async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    if (!projects || projects.length === 0) {
      projects = initialProjects;
    }
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.json({ success: true, count: initialProjects.length, data: initialProjects });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects, createProject };
