const Skill = require('../models/Skill');

const defaultSkills = [
  { name: 'C#', category: 'Backend', proficiency: 92, icon: 'code' },
  { name: 'ASP.NET', category: 'Backend', proficiency: 90, icon: 'server' },
  { name: 'ASP.NET Core', category: 'Backend', proficiency: 88, icon: 'cpu' },
  { name: 'Microservices', category: 'Backend', proficiency: 80, icon: 'layers' },
  { name: 'SQL Server', category: 'Database', proficiency: 92, icon: 'database' },
  { name: 'MySQL', category: 'Database', proficiency: 85, icon: 'database' },
  { name: 'C', category: 'Languages', proficiency: 85, icon: 'terminal' },
  { name: 'C++', category: 'Languages', proficiency: 88, icon: 'terminal' },
  { name: 'Python', category: 'Languages', proficiency: 82, icon: 'terminal' },
  { name: 'Data Structures & Algorithms', category: 'Fundamentals', proficiency: 90, icon: 'git-branch' },
  { name: 'DBMS', category: 'Fundamentals', proficiency: 88, icon: 'database' },
  { name: 'Operating Systems', category: 'Fundamentals', proficiency: 85, icon: 'hard-drive' },
  { name: 'Computer Networks', category: 'Fundamentals', proficiency: 82, icon: 'globe' },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 92, icon: 'layout' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 85, icon: 'code-2' },
  { name: 'Bootstrap', category: 'Frontend', proficiency: 90, icon: 'grid' },
  { name: 'Visual Studio', category: 'Tools', proficiency: 95, icon: 'wrench' },
  { name: 'Git & GitHub', category: 'Tools', proficiency: 90, icon: 'git-pull-request' },
  { name: 'Communication', category: 'Soft Skills', proficiency: 90, icon: 'message-square' },
  { name: 'Teamwork', category: 'Soft Skills', proficiency: 92, icon: 'users' },
  { name: 'Problem Solving', category: 'Soft Skills', proficiency: 95, icon: 'lightbulb' }
];

const getSkills = async (req, res) => {
  try {
    let skills = await Skill.find();
    if (!skills || skills.length === 0) {
      skills = defaultSkills;
    }
    res.json({ success: true, data: skills });
  } catch (error) {
    res.json({ success: true, data: defaultSkills });
  }
};

module.exports = { getSkills };
