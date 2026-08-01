export const resumeData = {
  personalInfo: {
    name: "ADITYA RAJESH CHAVAN",
    title: ".NET Core, Backend & Full-Stack Developer",
    email: "aadichavan8876@gmail.com",
    linkedin: "aditya-chavan17",
    linkedinUrl: "https://linkedin.com/in/aditya-chavan17",
    github: "aadichavan8876",
    githubUrl: "https://github.com/aadichavan8876",
    mobile: "+91 7887460937",
    summary: "Motivated Computer Science student with strong foundation in .NET Core, Data Structures & Algorithms, and Backend Development. Experienced in building RESTful APIs using MySQL & SQL Server, with hands-on project and internship experience. Actively practicing problem-solving on coding platforms and seeking opportunities to contribute to software development roles.",
    objective: "Seeking a challenging entry-level software development position in a high-growth tech organization to leverage expertise in .NET Core, C#, database design, and algorithmic problem solving."
  },
  education: [
    {
      degree: "Master of Science in Computer Applications (MSc CA)",
      institution: "Affiliated University",
      status: "Appearing",
      percentage: "In Progress",
      period: "2024 - Present",
      description: "Advanced study in Enterprise Application Architecture, Microservices, Data Science, and Advanced Software Engineering."
    },
    {
      degree: "Bachelor of Science in Computer Science (BSc CS)",
      institution: "Affiliated University",
      status: "Completed",
      percentage: "62%",
      period: "2021 - 2024",
      description: "Core subjects included Data Structures, Operating Systems, Database Management Systems, Object-Oriented Programming, and Web Development."
    },
    {
      degree: "Higher Secondary Certificate (HSC), Class XII",
      institution: "Maharashtra State Board",
      status: "Completed",
      percentage: "81.33%",
      period: "2020 - 2021",
      description: "Science Stream with focus on Physics, Chemistry, Mathematics, and Computer Science fundamentals."
    },
    {
      degree: "Secondary School Certificate (SSC), Class X",
      institution: "Maharashtra State Board",
      status: "Completed",
      percentage: "75.60%",
      period: "2018 - 2019",
      description: "General Secondary Education with distinction in Mathematics & Science."
    }
  ],
  skills: [
    { name: "C#", category: "Backend", proficiency: 92, icon: "Code" },
    { name: "ASP.NET", category: "Backend", proficiency: 90, icon: "Server" },
    { name: "ASP.NET Core", category: "Backend", proficiency: 88, icon: "Cpu" },
    { name: "Microservices", category: "Backend", proficiency: 80, icon: "Layers" },
    { name: "SQL Server", category: "Database", proficiency: 92, icon: "Database" },
    { name: "MySQL", category: "Database", proficiency: 85, icon: "Database" },
    { name: "C", category: "Programming Languages", proficiency: 85, icon: "Terminal" },
    { name: "C++", category: "Programming Languages", proficiency: 88, icon: "Terminal" },
    { name: "Python", category: "Programming Languages", proficiency: 82, icon: "Terminal" },
    { name: "Data Structures & Algorithms (DSA)", category: "Computer Science Fundamentals", proficiency: 90, icon: "GitBranch" },
    { name: "DBMS", category: "Computer Science Fundamentals", proficiency: 88, icon: "Database" },
    { name: "Operating Systems", category: "Computer Science Fundamentals", proficiency: 85, icon: "HardDrive" },
    { name: "Computer Networks", category: "Computer Science Fundamentals", proficiency: 82, icon: "Globe" },
    { name: "HTML5 & CSS3", category: "Frontend", proficiency: 92, icon: "Layout" },
    { name: "JavaScript", category: "Frontend", proficiency: 85, icon: "Code2" },
    { name: "Bootstrap", category: "Frontend", proficiency: 90, icon: "Grid" },
    { name: "Visual Studio", category: "Tools", proficiency: 95, icon: "Wrench" },
    { name: "Git & GitHub", category: "Tools", proficiency: 90, icon: "GitPullRequest" },
    { name: "Communication", category: "Soft Skills", proficiency: 90, icon: "MessageSquare" },
    { name: "Teamwork", category: "Soft Skills", proficiency: 92, icon: "Users" },
    { name: "Problem Solving", category: "Soft Skills", proficiency: 95, icon: "Lightbulb" }
  ],
  projects: [
    {
      id: "employee-management",
      title: "Employee Management System",
      techStack: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "JavaScript", "ADO.NET"],
      shortDescription: "Web-based Employee Management System to manage employee records efficiently with ADO.NET and SQL Server.",
      description: "Developed a comprehensive web-based Employee Management System to streamline employee lifecycle management. Implemented secure full CRUD operations, role-based login authorization, and ADO.NET database connectivity.",
      features: [
        "Full CRUD operations for employee onboarding, updating, viewing, and deletion",
        "Direct SQL Server database integration using ADO.NET for high query speed",
        "Role-based authentication system separating admin and employee privileges",
        "Responsive, mobile-friendly UI crafted with HTML, CSS, and Bootstrap"
      ],
      challenges: [
        "Handling raw SQL parameter mapping safely in ADO.NET without ORM overhead",
        "Maintaining responsive UI layouts for tabular data across multiple device viewports"
      ],
      futureImprovements: [
        "Migrating to ASP.NET Core Web API with Entity Framework Core for ORM abstraction",
        "Adding automated monthly payroll calculation and PDF generation"
      ],
      githubUrl: "https://github.com/aadichavan8876",
      liveDemoUrl: "https://employee-mgmt-system-demo.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      architecture: "Layered Architecture (UI Controllers, ADO.NET Data Context, SQL Server Database)",
      databaseDesign: "Normalized SQL tables (Employees, Departments, Roles, Salaries) with foreign key relationships."
    },
    {
      id: "food-ordering",
      title: "Online Food Ordering System",
      techStack: ["ASP.NET Core", "SQL Server", "Bootstrap", "JavaScript", "REST APIs"],
      shortDescription: "Online food ordering application with restaurant menu management, cart order processing, and tracking.",
      description: "Built an online food ordering web application featuring a user-friendly frontend interface, restaurant menu management, and real-time order tracking using ASP.NET Core REST APIs.",
      features: [
        "Interactive restaurant menu management and item availability toggles",
        "Cart management and dynamic order status tracking system",
        "REST APIs created for handling order processing and customer data securely",
        "High performance & responsiveness using ASP.NET Core framework"
      ],
      challenges: [
        "Designing state management logic for active cart items across navigation pages",
        "Structuring efficient REST API endpoints to minimize payload overhead"
      ],
      futureImprovements: [
        "Integration with Stripe/Razorpay payment gateways",
        "Live driver geolocation tracking using WebSockets"
      ],
      githubUrl: "https://github.com/aadichavan8876",
      liveDemoUrl: "https://food-ordering-system-demo.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
      architecture: "ASP.NET Core Controller-Service-Repository Pattern + Client API consumer.",
      databaseDesign: "Relational SQL Server Database containing Restaurants, MenuItems, Orders, OrderItems, and Customers."
    },
    {
      id: "student-management",
      title: "Student Management System",
      techStack: ["C#", "ASP.NET", "SQL Server", "OOP", "Database Normalization"],
      shortDescription: "Student Management System to handle student information, attendance, registration, and results.",
      description: "Built a Student Management System to organize student information, course enrollments, and attendance records. Applied Object-Oriented Programming (OOP) concepts and database normalization techniques.",
      features: [
        "Modules for student registration, course management, and result publishing",
        "Secure login authentication and server-side validation functionality",
        "SQL Server data storage with optimized indexes for quick data retrieval",
        "Applied core OOP concepts (Encapsulation, Inheritance, Interfaces)"
      ],
      challenges: [
        "Normalizing complex student academic records to 3NF to eliminate duplicate data",
        "Structuring input validation to prevent SQL injection and dirty inputs"
      ],
      futureImprovements: [
        "Automated GPA calculation engine and automated email report card dispatch",
        "Graphical attendance tracking charts for students and parents"
      ],
      githubUrl: "https://github.com/aadichavan8876",
      liveDemoUrl: "https://student-mgmt-demo.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      architecture: "N-Tier System Architecture with Encapsulated Business Objects.",
      databaseDesign: "Normalized 3NF Relational Database Schema in SQL Server."
    }
  ],
  internship: {
    role: ".NET Developer Intern",
    company: "CodeReach Software Pvt Ltd",
    duration: "6 Months",
    location: "India",
    responsibilities: [
      "Assisted in developing web applications using ASP.NET and C#",
      "Worked with SQL Server databases to execute queries and stored procedures",
      "Fixed application bugs and tested application modules for reliability",
      "Supported senior developers in feature development & code reviews",
      "Learned software development lifecycle (SDLC) and debugging techniques"
    ]
  },
  certifications: [
    {
      title: "ASP.NET & C# Development Certification",
      issuer: "Authorized Professional Academy",
      date: "2024",
      skills: ["C#", "ASP.NET Core", "Web API", "MVC Pattern"]
    },
    {
      title: "SQL Server Fundamentals Certification",
      issuer: "Database Academy",
      date: "2023",
      skills: ["SQL Server", "Queries", "Indexing", "Normalization"]
    },
    {
      title: "Web Development Certification",
      issuer: "Tech Certification Body",
      date: "2023",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
  ],
  codingProfiles: [
    {
      platform: "LeetCode",
      username: "aditya_chavan",
      url: "https://leetcode.com",
      focus: "Data Structures & Algorithms (DSA)",
      stats: { solved: "250+", streak: "35 Days", rating: "Top 25%" }
    },
    {
      platform: "CodeChef",
      username: "aditya_chavan",
      url: "https://codechef.com",
      focus: "Competitive Programming in .NET / C#",
      stats: { stars: "3★", problemsSolved: "180+", div: "Div 3" }
    },
    {
      platform: "GitHub",
      username: "aadichavan8876",
      url: "https://github.com/aadichavan8876",
      focus: "Open Source Repositories & .NET Projects",
      stats: { repos: "15+", contributions: "400+ this year" }
    }
  ]
};
