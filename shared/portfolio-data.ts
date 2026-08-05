// ─── SHARED PORTFOLIO DATA ───────────────────────────────────────────────────
// This file is the single source of truth for all portfolio content.
// It is imported by BOTH:
//   • src/data/resume.ts        (React app, via Vite)
//   • netlify/functions/chat.ts (Netlify Function, via Node.js)
//
// Rules:
//   - No React imports, no JSX, no DOM types
//   - No image paths (those are UI-layer concerns)
//   - No UI colors or theme values
//   - Plain TypeScript only — works in any Node/browser environment
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name:           "Daniel Lixandru Nicolae",
  title:          "AI & Full Stack Developer",
  email:          "uhajucewog80@gmail.com",
  location:       "Bucharest, Romania",
  github:         "https://github.com/TOPDEV99999",
  githubHandle:   "github.com/TOPDEV99999",
  availability:   "Open to Opportunities",
  tagline:        "Intelligent developer.\nTrusted by design.",
  yearsExperience: 8,
  companiesWorked: 3,
  projectsBuilt:  25,
  summary:
    "AI & Full Stack Developer with 8+ years of experience building scalable web applications, SaaS platforms, and AI-driven solutions. Proficient in designing modern frontend interfaces, backend architectures, and cloud systems. Specialized in React, Next.js, TypeScript, Node.js, Python, and AI integrations including LLM applications, RAG systems, and computer vision.",
};

export const education = [
  {
    degree:      "Bachelor of Science (B.Sc.) in Computer Science",
    institution: "University of Bucharest",
    period:      "09/2013 – 06/2017",
    location:    "Bucharest, Romania",
    highlights: [
      "Software engineering, algorithms, databases, and artificial intelligence",
      "Full-stack application development",
      "Computer networks, operating systems, and database systems",
    ],
  },
];

export const experiences = [
  {
    id:       "exp-1",
    company:  "NovaAI Technologies",
    position: "Senior AI Full Stack Developer",
    type:     "Remote",
    period:   "01/2022 – Present",
    current:  true,
    year:         "2022",
    systemLabel:  "AI Engineering Module Activated",
    responsibilities: [
      "Built AI-powered SaaS applications using React, Next.js, TypeScript, Node.js, and Python.",
      "Developed LLM, RAG, and AI automation solutions with modern AI technologies.",
      "Created scalable APIs, databases, and cloud-ready applications.",
      "Integrated AI models and third-party services into production systems.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "LLM", "RAG"],
  },
  {
    id:       "exp-2",
    company:  "Digital Solutions Lab",
    position: "Full Stack Developer",
    type:     "Remote",
    period:   "06/2019 – 12/2021",
    current:  false,
    year:         "2019",
    systemLabel:  "Full Stack Module Installed",
    responsibilities: [
      "Developed full-stack web applications using React, Node.js, TypeScript, and Python.",
      "Built REST APIs, SaaS platforms, and e-commerce solutions.",
      "Integrated databases, payment systems, and external APIs.",
    ],
    technologies: ["React", "Node.js", "TypeScript", "Python", "REST API", "SaaS"],
  },
  {
    id:       "exp-3",
    company:  "WebTech Romania",
    position: "Software Developer",
    type:     "On-site",
    period:   "06/2017 – 05/2019",
    current:  false,
    year:         "2017",
    systemLabel:  "Developer Core Initialized",
    responsibilities: [
      "Developed web applications using JavaScript, PHP, and Python.",
      "Built backend APIs and database-driven systems.",
      "Worked with MySQL, PostgreSQL, and MongoDB.",
    ],
    technologies: ["JavaScript", "PHP", "Python", "MySQL", "PostgreSQL", "MongoDB"],
  },
];

export const projects = [
  {
    id:          "proj-1",
    name:        "AI Knowledge Assistant Platform",
    subtitle:    "Enterprise RAG AI Chatbot & Document Intelligence System",
    period:      "01/2025 – 05/2025",
    category:    "AI / Enterprise",
    description: "An AI-powered knowledge assistant for searching and analyzing business documents at enterprise scale.",
    role:        "Lead Developer",
    features: [
      "RAG pipelines using LLMs, embeddings, and vector databases",
      "Full-stack architecture with Next.js frontend and FastAPI backend",
      "Authentication, document processing, and AI conversation features",
      "Semantic search via Qdrant vector database",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Qdrant", "OpenAI API"],
    links: {
      github: "https://github.com/TOPDEV99999/AI-Knowledge-Management-Platform",
      live:   "https://tkaxis.com/",
    },
    image:   "/projects/proj-1.png",
    problem: "Enterprises struggle to extract actionable insights from large document repositories. Manual search is slow and error-prone.",
  },
  {
    id:          "proj-2",
    name:        "SmartRecruit AI",
    subtitle:    "AI Recruitment Automation Platform",
    period:      "08/2024 – 12/2024",
    category:    "AI / HR Tech",
    description: "An AI platform for automated resume analysis and intelligent candidate matching for recruitment teams.",
    role:        "Full Stack Developer",
    features: [
      "NLP workflows for extracting skills and ranking applicants",
      "Recruiter dashboards and backend APIs",
      "Automated resume parsing and scoring",
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "Machine Learning"],
    links: {
      github: "https://github.com/TOPDEV99999/SmartRecruit-AI",
      live:   "https://thesmartrecruit.ai/",
    },
    image:   "/projects/proj-2.png",
    problem: "Recruiters spend excessive time manually screening resumes. AI-driven automation can dramatically reduce time-to-hire.",
  },
  {
    id:          "proj-3",
    name:        "DermaIQ",
    subtitle:    "AI Medical Image Analysis Platform",
    period:      "01/2024 – 05/2024",
    category:    "AI / Healthcare",
    description: "An AI-powered healthcare platform for skin image analysis using advanced computer vision pipelines.",
    role:        "AI & Full Stack Developer",
    features: [
      "Computer vision pipelines for image classification",
      "Secure APIs and responsive user interfaces",
      "Healthcare-grade data privacy handling",
    ],
    technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React"],
    links: {
      github: "https://github.com/TOPDEV99999/ai-healthcare-platform",
      live:   "http://www.dermaiq.com/",
    },
    image:   "/projects/proj-3.png",
    problem: "Early skin condition detection requires specialist access. AI-powered image analysis can democratize preliminary screening.",
  },
  {
    id:          "proj-4",
    name:        "CodePilot AI",
    subtitle:    "AI Coding Assistant for Developers",
    period:      "09/2023 – 12/2023",
    category:    "AI / Developer Tools",
    description: "An AI assistant for code explanation, debugging, and documentation generation.",
    role:        "Full Stack Developer",
    features: [
      "LLM APIs integrated into a developer productivity platform",
      "Interactive chat interfaces and project management features",
      "Code explanation and documentation generation",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "OpenAI API"],
    links: {
      github: "https://github.com/TOPDEV99999/AI-codepilot",
      live:   "https://code-pilot-puce.vercel.app/",
    },
    image:   "/projects/proj-4.png",
    problem: "Developers lose hours to repetitive debugging and documentation. An integrated AI assistant reduces cognitive overhead.",
  },
  {
    id:          "proj-5",
    name:        "ShopMind AI",
    subtitle:    "AI-Powered E-commerce Platform",
    period:      "03/2023 – 08/2023",
    category:    "AI / E-commerce",
    description: "A full-stack e-commerce platform with AI-powered product recommendations and customer analytics.",
    role:        "Full Stack Developer",
    features: [
      "AI-powered product recommendation engine",
      "Product management and payment integration via Stripe",
      "Customer analytics dashboard",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AI APIs"],
    links: {
      github: "https://github.com/TOPDEV99999/ai-ShopMind",
      live:   null,
    },
    image:   "/projects/proj-5.png",
    problem: "Generic e-commerce platforms lack personalization. AI-driven recommendations improve conversion and customer retention.",
  },
  {
    id:          "proj-6",
    name:        "FaceSwap AI",
    subtitle:    "Real-Time AI Face Swap & Deep Synthesis Platform",
    period:      "06/2022 – 10/2022",
    category:    "AI / Computer Vision",
    description: "A real-time AI face swap platform using deep learning for high-fidelity facial synthesis and video processing.",
    role:        "AI & Full Stack Developer",
    features: [
      "Real-time face detection and landmark extraction pipeline",
      "Deep learning model integration for high-fidelity face synthesis",
      "Video frame processing with optimized inference",
      "Secure API with rate limiting and content moderation",
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "TypeScript"],
    links: {
      github: "https://github.com/TOPDEV99999/face-swap",
      live:   "https://face-swap-topdev.netlify.app/",
    },
    image:   "/projects/proj-6.png",
    problem: "Production-quality face synthesis requires low-latency inference pipelines and robust handling of varied lighting, angles, and occlusions.",
  },
];

export const skills = {
  frontend: {
    label: "Frontend Development",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Framer Motion"],
  },
  backend: {
    label: "Backend Development",
    items: ["Node.js", "Express.js", "NestJS", "Python", "FastAPI", "REST API", "GraphQL"],
  },
  ai: {
    label: "Artificial Intelligence",
    items: ["OpenAI API", "Gemini API", "Claude API", "LangChain", "LangGraph", "RAG Architecture", "Vector Databases", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
  },
  databases: {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "Qdrant"],
  },
  cloud: {
    label: "Cloud & DevOps",
    items: ["Docker", "AWS", "Google Cloud", "GitHub Actions", "CI/CD", "Linux"],
  },
};

export const services = [
  { title: "AI Application Development",   description: "RAG systems, LLM integrations, AI chatbots, and custom AI-powered features." },
  { title: "Full Stack Development",        description: "End-to-end web applications with React/Next.js frontends and Node.js/Python backends." },
  { title: "SaaS Platform Architecture",   description: "Scalable, cloud-ready SaaS products with modern authentication and infrastructure." },
  { title: "Technical Consultation",        description: "Architecture reviews, technology selection, and AI strategy for your product." },
];

// ── System prompt builder ──────────────────────────────────────────────────
// Used by the Netlify Function to inject portfolio context into every Gemini call.
// Rebuild it from the live data above — no drift possible.
export function buildSystemPrompt(): string {
  const projectList = projects
    .map(p => `  • ${p.name} (${p.period.split('–')[1]?.trim() ?? p.period}) — ${p.category}\n    ${p.description}\n    Stack: ${p.technologies.join(', ')}\n    Live: ${p.links.live ?? 'N/A'}  GitHub: ${p.links.github ?? 'N/A'}`)
    .join('\n\n');

  const experienceList = experiences
    .map(e => `  • ${e.position} @ ${e.company} (${e.period})${e.current ? ' [CURRENT]' : ''}\n    ${e.responsibilities[0]}`)
    .join('\n\n');

  const allSkills = Object.values(skills)
    .map(s => `  ${s.label}: ${s.items.join(', ')}`)
    .join('\n');

  const serviceList = services.map(s => `  • ${s.title}: ${s.description}`).join('\n');

  return `You are Nova, the personal AI assistant for ${profile.name}'s developer portfolio.
Your role is to help visitors learn about Daniel and consider working with him.
Always be helpful, concise, and professional. Never fabricate information.
If asked something outside Daniel's portfolio, politely redirect to what you know.

## About Daniel
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Email: ${profile.email}
GitHub: ${profile.github}
Availability: ${profile.availability}
Experience: ${profile.yearsExperience}+ years | ${profile.companiesWorked} companies | ${profile.projectsBuilt}+ projects

${profile.summary}

## Education
${education.map(e => `${e.degree} — ${e.institution} (${e.period})`).join('\n')}

## Work Experience
${experienceList}

## Projects (${projects.length} total)
${projectList}

## Technical Skills
${allSkills}

## Services Offered
${serviceList}

## Contact
- Email: ${profile.email}
- GitHub: ${profile.github}
- Location: ${profile.location} (fully remote, EET UTC+2/+3)
- Currently open to: freelance, contract, full-time remote, AI consulting

Answer naturally in the same language the visitor uses.
Keep responses focused and under 300 words unless a detailed breakdown is specifically requested.`;
}
