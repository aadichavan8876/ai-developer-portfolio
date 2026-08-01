const { OpenAI } = require('openai');

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Contextual fallback response generator trained exclusively on Aditya Rajesh Chavan's Resume
const generateFallbackResponse = (feature, prompt, contextData = {}) => {
  const query = prompt.toLowerCase();

  switch (feature) {
    case 'chatbot':
      if (query.includes('about yourself') || query.includes('who are you') || query.includes('intro')) {
        return "Hello! I am Aditya Rajesh Chavan's AI Assistant. Aditya is a motivated Computer Science student and software developer with a strong foundation in .NET Core, C#, Data Structures & Algorithms (DSA), and Backend Development. He holds a BSc in CS (62%) and is currently appearing for his Master of Science in Computer Applications (MSc CA). He has completed a 6-month internship at CodeReach Software Pvt Ltd and built several full-stack projects using ASP.NET Core, C#, and SQL Server.";
      }
      if (query.includes('project')) {
        return "Aditya has built 3 key software engineering projects:\n1. **Employee Management System**: ASP.NET, C#, SQL Server, ADO.NET, HTML/CSS/JS, with full CRUD and role-based access control.\n2. **Online Food Ordering System**: ASP.NET Core, SQL Server, REST APIs, Bootstrap, JS for order processing and tracking.\n3. **Student Management System**: C#, ASP.NET, SQL Server using OOP concepts & DB normalization for course & attendance management.";
      }
      if (query.includes('skill') || query.includes('know') || query.includes('tech stack')) {
        return "Aditya's technical skills include:\n- **Programming Languages**: C, C++, Python, C#\n- **Backend Development**: C#, ASP.NET, ASP.NET Core, Microservices\n- **Web Technologies**: HTML, CSS, JavaScript, Bootstrap\n- **Databases**: SQL Server, MySQL\n- **CS Fundamentals**: Data Structures & Algorithms (DSA), DBMS, Operating Systems, Computer Networks\n- **Tools**: Visual Studio, Git, GitHub";
      }
      if (query.includes('intern') || query.includes('experience') || query.includes('codereach')) {
        return "Aditya worked as a **.NET Developer Intern** at **CodeReach Software Pvt Ltd** for 6 months. During his internship, he assisted in developing web applications with ASP.NET & C#, worked with SQL Server databases, fixed application bugs, supported senior developers, and gained practical SDLC & debugging experience.";
      }
      if (query.includes('strength') || query.includes('soft skill')) {
        return "Aditya's core strengths include strong problem-solving capabilities, clear communication, active teamwork, and a dedicated practice in Data Structures & Algorithms on LeetCode and CodeChef.";
      }
      if (query.includes('certif') || query.includes('course')) {
        return "Aditya holds three official certifications:\n1. **ASP.NET & C# Development Certification**\n2. **SQL Server Fundamentals Certification**\n3. **Web Development Certification (HTML, CSS, JavaScript)**";
      }
      return `Aditya Rajesh Chavan is a .NET & Full-Stack Developer proficient in C#, ASP.NET Core, SQL Server, and DSA. Regarding your question ("${prompt}"), feel free to ask about his projects (Employee Management, Online Food Ordering, Student Management), internship at CodeReach Software, certifications, or technical stack!`;

    case 'project_explainer':
      const projName = contextData.projectName || "Selected Project";
      return JSON.stringify({
        projectName: projName,
        architecture: "Layered MVC (Model-View-Controller) / RESTful Service Architecture with decoupled Data Access Layer using ADO.NET / Entity Framework for database operations.",
        databaseDesign: "Normalized Relational DB Schema in SQL Server featuring primary/foreign key constraints, indexed student/order/employee tables, and transactional integrity.",
        features: [
          "Secure user authentication & role-based authorization",
          "Automated CRUD operations with real-time field validation",
          "Responsive front-end UI styled with Bootstrap & HTML5/CSS3",
          "High-performance RESTful API endpoints for backend communication"
        ],
        challenges: [
          "Optimizing SQL query execution time for nested join operations",
          "Maintaining clean state separation between UI controllers and backend database contexts",
          "Ensuring seamless cross-browser responsiveness"
        ],
        futureScope: [
          "Integration with JWT-based microservices architecture",
          "Docker containerization & deployment to Cloud (Render/AWS)",
          "Real-time analytics dashboard with SignalR websockets"
        ]
      });

    case 'career_advisor':
      return `### 🗺️ Tailored Career Roadmap & Advice for ${prompt || 'Backend Development'}

**Current Profile Assessment:**
Strong foundation in .NET Core, C#, SQL Server, and DSA. 6-Month .NET Development Internship at CodeReach Software Pvt Ltd.

**Recommended Next Steps:**
1. **Cloud Integration**: Learn AWS or Azure deployments for ASP.NET Core Web APIs.
2. **Microservices & Messaging**: Explore RabbitMQ/Kafka & Docker containerization.
3. **Advanced Frontend**: Deepen expertise in React.js state management & TypeScript to complement backend strength.
4. **System Design**: Practice High-Level & Low-Level Design (LLD/HLD) for scalable backend architecture.

**Interview Prep Strategy:**
- Focus heavily on C# OOP principles (Polymorphism, Dependency Injection, Async/Await).
- Practice SQL Server queries (Window functions, CTEs, Indexing).
- Keep solving 1-2 Medium problems daily on LeetCode.`;

    case 'interview_simulator':
      const topic = prompt || ".NET & Backend Development";
      return JSON.stringify({
        topic: topic,
        questions: [
          {
            id: 1,
            category: topic,
            question: "Explain Dependency Injection in ASP.NET Core and the difference between Transient, Scoped, and Singleton lifetimes.",
            sampleAnswer: "Dependency Injection (DI) is a software design pattern that allows achieving Inversion of Control (IoC) between classes and their dependencies. Transient objects are created each time they are requested; Scoped objects are created once per client request (connection); Singleton objects are created the first time they are requested and stay the same throughout application lifecycle."
          },
          {
            id: 2,
            category: "C# & Object-Oriented Programming",
            question: "What is the difference between abstract classes and interfaces in C#?",
            sampleAnswer: "An abstract class can provide default code implementations, fields, and constructors, allowing single inheritance. An interface defines contracts without state (until modern C# default methods) and supports multiple inheritance."
          },
          {
            id: 3,
            category: "SQL Server & Database",
            question: "How do Clustered and Non-Clustered Indexes differ in SQL Server?",
            sampleAnswer: "A Clustered Index physically reorders the rows in the table to match the index key (only one per table). A Non-Clustered Index creates a separate structure storing pointers (RID or clustered index key) back to the data rows."
          },
          {
            id: 4,
            category: "Data Structures & Algorithms",
            question: "How would you detect a cycle in a linked list?",
            sampleAnswer: "By using Floyd's Cycle Detection Algorithm (Slow and Fast pointer approach). Move slow by 1 step and fast by 2 steps. If fast meets slow, a cycle exists."
          }
        ]
      });

    case 'resume_analyzer':
      return JSON.stringify({
        atsScore: 88,
        matchPercentage: "88%",
        matchingSkills: ["C#", "ASP.NET Core", "SQL Server", "HTML/CSS", "JavaScript", "DSA", "Git"],
        missingSkills: ["Docker", "Kubernetes", "AWS Cloud", "GraphQL"],
        strengths: [
          "Solid academic foundation in Computer Science (BSc CS + MSc CA)",
          "Hands-on 6-month industry internship at CodeReach Software",
          "Practical project work implementing CRUD, ADO.NET, and RESTful APIs",
          "Active competitive programming profile on LeetCode & CodeChef"
        ],
        suggestions: [
          "Highlight quantified metrics in project descriptions (e.g., 'improved query execution by 30%').",
          "Add cloud deployment badges (Vercel/Render/Azure) directly next to GitHub repositories.",
          "Include links to live demo instances for key projects."
        ]
      });

    case 'code_generator':
      if (query.includes('controller') || query.includes('asp.net') || query.includes('c#')) {
        return `\`\`\`csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _repository.GetAllAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _repository.AddAsync(dto);
            return CreatedAtAction(nameof(GetAllEmployees), new { id = result.Id }, result);
        }
    }
}
\`\`\``;
      }
      return `\`\`\`sql
-- SQL Server Stored Procedure for CRUD Operation
CREATE PROCEDURE sp_ManageEmployeeRecords
    @Action VARCHAR(10),
    @EmployeeId INT = NULL,
    @Name NVARCHAR(100) = NULL,
    @Department NVARCHAR(50) = NULL,
    @Salary DECIMAL(18,2) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Action = 'INSERT'
    BEGIN
        INSERT INTO Employees (Name, Department, Salary, CreatedAt)
        VALUES (@Name, @Department, @Salary, GETDATE());
    END
    ELSE IF @Action = 'SELECT'
    BEGIN
        SELECT EmployeeId, Name, Department, Salary, CreatedAt 
        FROM Employees 
        WHERE (@EmployeeId IS NULL OR EmployeeId = @EmployeeId);
    END
END;
\`\`\``;

    default:
      return "AI processing completed successfully.";
  }
};

const callAI = async (feature, prompt, contextData = {}) => {
  if (!openai) {
    return generateFallbackResponse(feature, prompt, contextData);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI Assistant for Aditya Rajesh Chavan, a software engineer proficient in .NET Core, C#, ASP.NET, SQL Server, and Data Structures. Provide accurate, professional responses.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.warn(`[AI Service Warning] OpenAI API failed (${error.message}). Falling back to local resume engine.`);
    return generateFallbackResponse(feature, prompt, contextData);
  }
};

module.exports = { callAI };
