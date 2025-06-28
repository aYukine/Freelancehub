// Test users data
const testUsers = [
    {
        id: 1,
        email: "developer@test.com",
        password: "password123",
        userType: "freelancer",
        name: "Alex Johnson",
        title: "Full Stack Developer",
        avatar: "AJ",
        skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB"],
        hourlyRate: 75,
        rating: 4.9,
        completedProjects: 47,
        description: "Experienced full-stack developer with 5+ years of experience building web applications. Specialized in modern JavaScript frameworks and cloud technologies.",
        location: "San Francisco, CA",
        joinDate: "2023-01-15",
        portfolio: [
            {
                title: "E-commerce Platform",
                description: "Built a full-featured e-commerce platform with React and Node.js",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "portfolio1.jpg"
            },
            {
                title: "Task Management App",
                description: "Developed a collaborative task management application",
                technologies: ["Vue.js", "Express", "PostgreSQL"],
                image: "portfolio2.jpg"
            }
        ]
    },
    {
        id: 2,
        email: "client@test.com",
        password: "password123",
        userType: "client",
        name: "Sarah Wilson",
        title: "Product Manager",
        avatar: "SW",
        company: "TechStart Inc.",
        description: "Product manager looking for talented developers to bring innovative ideas to life.",
        location: "New York, NY",
        joinDate: "2023-03-20",
        postedJobs: 12,
        totalSpent: 45000
    },
    {
        id: 3,
        email: "designer@test.com",
        password: "password123",
        userType: "freelancer",
        name: "Maria Garcia",
        title: "UI/UX Designer",
        avatar: "MG",
        skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "User Research"],
        hourlyRate: 65,
        rating: 4.8,
        completedProjects: 32,
        description: "Creative UI/UX designer with a passion for creating beautiful and functional user experiences. 4+ years of experience in digital design.",
        location: "Los Angeles, CA",
        joinDate: "2023-02-10"
    },
    {
        id: 4,
        email: "marketer@test.com",
        password: "password123",
        userType: "freelancer",
        name: "David Chen",
        title: "Digital Marketing Specialist",
        avatar: "DC",
        skills: ["SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Analytics"],
        hourlyRate: 55,
        rating: 4.7,
        completedProjects: 28,
        description: "Results-driven digital marketer helping businesses grow their online presence and increase conversions.",
        location: "Austin, TX",
        joinDate: "2023-04-05"
    },
    {
        id: 5,
        email: "mobile@test.com",
        password: "password123",
        userType: "freelancer",
        name: "Jennifer Kim",
        title: "Mobile App Developer",
        avatar: "JK",
        skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
        hourlyRate: 80,
        rating: 4.9,
        completedProjects: 23,
        description: "Mobile app developer specializing in cross-platform development with React Native and Flutter.",
        location: "Seattle, WA",
        joinDate: "2023-01-30"
    }
];

// Test jobs data
const testJobs = [
    {
        id: 1,
        title: "E-commerce Website Development",
        company: "TechStart Inc.",
        clientId: 2,
        description: "We need a modern e-commerce website built from scratch. The site should include user authentication, product catalog, shopping cart, payment integration, and admin panel. Must be responsive and optimized for performance.",
        skills: ["React", "Node.js", "MongoDB", "Stripe", "CSS"],
        paymentType: "project",
        budget: 5000,
        duration: "6-8 weeks",
        postedDate: "2025-06-25",
        deadline: "2025-08-15",
        status: "open",
        applications: 12,
        location: "Remote",
        experienceLevel: "Intermediate",
        category: "Web Development"
    },
    {
        id: 2,
        title: "Mobile App UI/UX Design",
        company: "FinTech Solutions",
        clientId: 2,
        description: "Looking for a talented UI/UX designer to create wireframes and high-fidelity designs for our fintech mobile application. Experience with financial apps is a plus.",
        skills: ["Figma", "UI Design", "UX Design", "Mobile Design", "Prototyping"],
        paymentType: "hourly",
        hourlyRate: 70,
        duration: "4-6 weeks",
        postedDate: "2025-06-24",
        deadline: "2025-07-30",
        status: "open",
        applications: 8,
        location: "Remote",
        experienceLevel: "Expert",
        category: "Design"
    },
    {
        id: 3,
        title: "WordPress Blog Setup",
        company: "Local Business",
        clientId: 2,
        description: "Need help setting up a WordPress blog for our local business. Should include custom theme, basic SEO setup, and content management training.",
        skills: ["WordPress", "PHP", "CSS", "SEO"],
        paymentType: "project",
        budget: 800,
        duration: "1-2 weeks",
        postedDate: "2025-06-23",
        deadline: "2025-07-10",
        status: "open",
        applications: 15,
        location: "New York, NY",
        experienceLevel: "Beginner",
        category: "Web Development"
    },
    {
        id: 4,
        title: "Python Data Analysis Script",
        company: "Research Institute",
        clientId: 2,
        description: "We need a Python script to analyze large datasets and generate automated reports. Experience with pandas, matplotlib, and data visualization required.",
        skills: ["Python", "Pandas", "Data Analysis", "Matplotlib", "NumPy"],
        paymentType: "hourly",
        hourlyRate: 60,
        duration: "2-3 weeks",
        postedDate: "2025-06-22",
        deadline: "2025-07-15",
        status: "open",
        applications: 6,
        location: "Remote",
        experienceLevel: "Intermediate",
        category: "Data Science"
    },
    {
        id: 5,
        title: "Social Media Marketing Campaign",
        company: "Startup Ventures",
        clientId: 2,
        description: "Looking for a digital marketer to create and manage social media campaigns across Facebook, Instagram, and LinkedIn. Goal is to increase brand awareness and lead generation.",
        skills: ["Social Media Marketing", "Facebook Ads", "Instagram", "LinkedIn", "Content Creation"],
        paymentType: "project",
        budget: 2500,
        duration: "1 month",
        postedDate: "2025-06-21",
        deadline: "2025-07-21",
        status: "open",
        applications: 9,
        location: "Remote",
        experienceLevel: "Intermediate",
        category: "Marketing"
    },
    {
        id: 6,
        title: "React Native Mobile App",
        company: "Health Tech Co.",
        clientId: 2,
        description: "Develop a health tracking mobile app using React Native. App should sync with fitness devices and provide data visualization. Experience with health APIs preferred.",
        skills: ["React Native", "JavaScript", "API Integration", "Health APIs", "Firebase"],
        paymentType: "project",
        budget: 8000,
        duration: "8-10 weeks",
        postedDate: "2025-06-20",
        deadline: "2025-08-30",
        status: "open",
        applications: 4,
        location: "Remote",
        experienceLevel: "Expert",
        category: "Mobile Development"
    },
    {
        id: 7,
        title: "Logo Design for Tech Startup",
        company: "AI Innovations",
        clientId: 2,
        description: "Need a modern, professional logo for our AI technology startup. Should work well in both digital and print formats. Multiple concepts and revisions included.",
        skills: ["Logo Design", "Branding", "Adobe Illustrator", "Graphic Design"],
        paymentType: "project",
        budget: 500,
        duration: "1-2 weeks",
        postedDate: "2025-06-19",
        deadline: "2025-07-05",
        status: "open",
        applications: 22,
        location: "Remote",
        experienceLevel: "Intermediate",
        category: "Design"
    },
    {
        id: 8,
        title: "SEO Optimization for E-commerce Site",
        company: "Online Retailer",
        clientId: 2,
        description: "Optimize our existing e-commerce website for search engines. Includes keyword research, on-page optimization, technical SEO, and performance improvements.",
        skills: ["SEO", "Google Analytics", "Keyword Research", "Technical SEO", "Performance Optimization"],
        paymentType: "hourly",
        hourlyRate: 50,
        duration: "4-6 weeks",
        postedDate: "2025-06-18",
        deadline: "2025-08-01",
        status: "open",
        applications: 11,
        location: "Remote",
        experienceLevel: "Expert",
        category: "Marketing"
    }
];

// Chat messages data
const testChatMessages = {
    1: [ // Chat between user 1 (developer) and user 2 (client)
        {
            id: 1,
            senderId: 2,
            receiverId: 1,
            message: "Hi Alex! I saw your profile and I'm interested in discussing the e-commerce project.",
            timestamp: "2025-06-26T10:30:00Z",
            read: true
        },
        {
            id: 2,
            senderId: 1,
            receiverId: 2,
            message: "Hello Sarah! Thanks for reaching out. I'd be happy to discuss your e-commerce project. Could you share more details about your requirements?",
            timestamp: "2025-06-26T10:45:00Z",
            read: true
        },
        {
            id: 3,
            senderId: 2,
            receiverId: 1,
            message: "Sure! We need a full e-commerce platform with product catalog, user accounts, payment processing, and inventory management. The budget is around $5000.",
            timestamp: "2025-06-26T11:00:00Z",
            read: true
        },
        {
            id: 4,
            senderId: 1,
            receiverId: 2,
            message: "That sounds like a great project! Based on your requirements, I can definitely help you build this. The timeline would be around 6-8 weeks. Would you like to schedule a call to discuss the technical details?",
            timestamp: "2025-06-26T11:15:00Z",
            read: false
        }
    ]
};

// Skills list for autocomplete
const availableSkills = [
    "JavaScript", "Python", "React", "Node.js", "Vue.js", "Angular", "HTML", "CSS", "SASS", "LESS",
    "PHP", "Laravel", "Symfony", "WordPress", "Drupal", "Java", "Spring Boot", "C#", ".NET",
    "Ruby", "Ruby on Rails", "Go", "Rust", "Swift", "Kotlin", "React Native", "Flutter",
    "MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase", "AWS", "Azure", "Google Cloud",
    "Docker", "Kubernetes", "DevOps", "CI/CD", "Git", "Linux", "Ubuntu", "CentOS",
    "UI Design", "UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator",
    "InDesign", "After Effects", "Premiere Pro", "3D Modeling", "Blender", "AutoCAD",
    "SEO", "SEM", "Google Ads", "Facebook Ads", "Social Media Marketing", "Content Marketing",
    "Email Marketing", "Copywriting", "Graphic Design", "Branding", "Logo Design",
    "Data Analysis", "Machine Learning", "AI", "TensorFlow", "PyTorch", "Pandas", "NumPy",
    "R", "Tableau", "Power BI", "Excel", "Statistics", "Data Visualization",
    "Project Management", "Agile", "Scrum", "Jira", "Trello", "Slack", "Communication",
    "Testing", "QA", "Selenium", "Jest", "Cypress", "Unit Testing", "Integration Testing"
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testUsers,
        testJobs,
        testChatMessages,
        availableSkills
    };
}
