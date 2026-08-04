// ─── DANIEL OS — Resume Data ─────────────────────────────────────────────────
// Single source of truth extracted from Daniel Lixandru Nicolae's resume.
// Do NOT add any information not present in the original CV.

export const profile = {
  name: "Daniel Lixandru Nicolae",
  title: "AI & Full Stack Developer",
  email: "uhajucewog80@gmail.com",
  location: "Bucharest, Romania",
  github: "https://github.com/TOPDEV99999",
  githubHandle: "github.com/TOPDEV99999",
  availability: "Open to Opportunities",
  summary:
    "AI & Full Stack Developer with 8+ years of experience in building scalable web applications, SaaS platforms, and AI-driven solutions. Proficient in designing modern frontend interfaces, backend architectures, and cloud systems. Specialized in React, Next.js, TypeScript, Node.js, Python, and AI integrations, including LLM applications, RAG systems, and computer vision. Skilled in automation workflows and dedicated to developing high-performance software to address business challenges.",
  tagline: "Intelligent developer.\nTrusted by design.",
  yearsExperience: 8,
  companiesWorked: 3,
  projectsBuilt: 25,
};

export const education = [
  {
    degree: "Bachelor of Science (B.Sc.) in Computer Science",
    institution: "University of Bucharest",
    period: "09/2013 – 06/2017",
    location: "Bucharest, Romania",
    highlights: [
      "Studied software engineering, algorithms, databases, and artificial intelligence.",
      "Developed full-stack applications using modern programming technologies.",
      "Completed projects focused on web development and software engineering.",
      "Learned computer networks, operating systems, and database systems.",
    ],
  },
];

export const experiences = [
  {
    id: "exp-1",
    company: "NovaAI Technologies",
    position: "Senior AI Full Stack Developer",
    type: "Remote",
    period: "01/2022 – Present",
    location: "Bucharest, Romania (Remote)",
    current: true,
    systemLabel: "AI Engineering Module Activated",
    year: "2022",
    responsibilities: [
      "Built AI-powered SaaS applications using React, Next.js, TypeScript, Node.js, and Python.",
      "Developed LLM, RAG, and AI automation solutions with modern AI technologies.",
      "Created scalable APIs, databases, and cloud-ready applications.",
      "Integrated AI models and third-party services into production systems.",
      "Improved application performance, security, and user experience.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "LLM", "RAG"],
  },
  {
    id: "exp-2",
    company: "Digital Solutions Lab",
    position: "Full Stack Developer",
    type: "Remote",
    period: "06/2019 – 12/2021",
    location: "Bucharest, Romania (Remote)",
    current: false,
    systemLabel: "Full Stack Module Installed",
    year: "2019",
    responsibilities: [
      "Developed full-stack web applications using React, Node.js, TypeScript, and Python.",
      "Built REST APIs, SaaS platforms, and e-commerce solutions.",
      "Designed responsive interfaces and optimized application performance.",
      "Integrated databases, payment systems, and external APIs.",
    ],
    technologies: ["React", "Node.js", "TypeScript", "Python", "REST API", "SaaS"],
  },
  {
    id: "exp-3",
    company: "WebTech Romania",
    position: "Software Developer",
    type: "On-site",
    period: "06/2017 – 05/2019",
    location: "Bucharest, Romania",
    current: false,
    systemLabel: "Developer Core Initialized",
    year: "2017",
    responsibilities: [
      "Developed web applications using JavaScript, PHP, and Python.",
      "Built backend APIs and database-driven systems.",
      "Created responsive UI components and application features.",
      "Worked with MySQL, PostgreSQL, and MongoDB.",
    ],
    technologies: ["JavaScript", "PHP", "Python", "MySQL", "PostgreSQL", "MongoDB"],
  },
];

export const projects = [
  {
    id: "proj-1",
    name: "AI Knowledge Assistant Platform",
    subtitle: "Enterprise RAG AI Chatbot & Document Intelligence System",
    period: "01/2025 – 05/2025",
    category: "AI / Enterprise",
    description:
      "An AI-powered knowledge assistant for searching and analyzing business documents at enterprise scale.",
    problem:
      "Enterprises struggle to extract actionable insights from large document repositories. Manual search is slow and error-prone.",
    role: "Lead Developer",
    features: [
      "RAG pipelines using LLMs, embeddings, and vector databases",
      "Full-stack architecture with modern frontend and backend",
      "Authentication, document processing, and AI conversation features",
      "Document intelligence and semantic search",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Qdrant", "OpenAI API"],
    links: { github: 'https://github.com/TOPDEV99999/AI-Knowledge-Management-Platform', live: 'https://tkaxis.com/' },
    image: '/projects/proj-1.png',
    highlight: true,
  },
  {
    id: "proj-2",
    name: "SmartRecruit AI",
    subtitle: "AI Recruitment Automation Platform",
    period: "08/2024 – 12/2024",
    category: "AI / HR Tech",
    description:
      "An AI platform for automated resume analysis and intelligent candidate matching for recruitment teams.",
    problem:
      "Recruiters spend excessive time manually screening resumes. AI-driven automation can dramatically reduce time-to-hire.",
    role: "Full Stack Developer",
    features: [
      "NLP workflows for extracting skills and ranking applicants",
      "Recruiter dashboards and backend APIs",
      "Integrated AI models to improve recruitment workflows",
      "Automated resume parsing and scoring",
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "Machine Learning"],
    links: { github: 'https://github.com/TOPDEV99999/SmartRecruit-AI', live: 'https://thesmartrecruit.ai/' },
    image: '/projects/proj-2.png',
    highlight: false,
  },
  {
    id: "proj-3",
    name: "DermaIQ",
    subtitle: "AI Medical Image Analysis Platform",
    period: "01/2024 – 05/2024",
    category: "AI / Healthcare",
    description:
      "An AI-powered healthcare platform for skin image analysis using advanced computer vision pipelines.",
    problem:
      "Early skin condition detection requires specialist access. AI-powered image analysis can democratize preliminary screening.",
    role: "AI & Full Stack Developer",
    features: [
      "Computer vision pipelines for image classification",
      "Secure APIs and responsive user interfaces",
      "Optimized AI inference performance",
      "Healthcare-grade data privacy handling",
    ],
    technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React"],
    links: { github: 'https://github.com/TOPDEV99999/ai-healthcare-platform', live: 'http://www.dermaiq.com/' },
    image: '/projects/proj-3.png',
    highlight: false,
  },
  {
    id: "proj-4",
    name: "CodePilot AI",
    subtitle: "AI Coding Assistant for Developers",
    period: "09/2023 – 12/2023",
    category: "AI / Developer Tools",
    description:
      "An AI assistant for code explanation, debugging, and documentation generation targeting developer productivity.",
    problem:
      "Developers lose hours to repetitive debugging and documentation. An integrated AI assistant reduces cognitive overhead.",
    role: "Full Stack Developer",
    features: [
      "LLM APIs integrated into a developer productivity platform",
      "Interactive chat interfaces",
      "Project management features",
      "Code explanation and documentation generation",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "OpenAI API"],
    links: { github: 'https://github.com/TOPDEV99999/AI-codepilot', live: 'https://code-pilot-puce.vercel.app/' },
    image: '/projects/proj-4.png',
    highlight: false,
  },
  {
    id: "proj-5",
    name: "ShopMind AI",
    subtitle: "AI-Powered E-commerce Platform",
    period: "03/2023 – 08/2023",
    category: "AI / E-commerce",
    description:
      "A full-stack e-commerce platform with AI-powered product recommendations and customer analytics.",
    problem:
      "Generic e-commerce platforms lack personalization. AI-driven recommendations improve conversion and customer retention.",
    role: "Full Stack Developer",
    features: [
      "AI-powered product recommendation engine",
      "Product management and payment integration",
      "Customer analytics dashboard",
      "Scalable APIs and responsive UI",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AI APIs"],
    links: { github: 'https://github.com/TOPDEV99999/ai-ShopMind', live: null },
    image: '/projects/proj-5.png',
    highlight: false,
  },
  {
    id: "proj-6",
    name: "FaceSwap AI",
    subtitle: "Real-Time AI Face Swap & Deep Synthesis Platform",
    period: "06/2022 – 10/2022",
    category: "AI / Computer Vision",
    description:
      "A real-time AI face swap platform using deep learning models for high-fidelity facial synthesis and video processing.",
    problem:
      "Production-quality face synthesis requires low-latency inference pipelines and robust handling of varied lighting, angles, and occlusions — challenges that off-the-shelf models alone cannot solve.",
    role: "AI & Full Stack Developer",
    features: [
      "Real-time face detection and landmark extraction pipeline",
      "Deep learning model integration for high-fidelity face synthesis",
      "Video frame processing with optimized inference performance",
      "Secure API layer with rate limiting and content moderation hooks",
      "Responsive web interface for upload, preview, and export",
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "TypeScript"],
    links: { github: 'https://github.com/TOPDEV99999/face-swap', live: 'https://face-swap-topdev.netlify.app/' },
    image: '/projects/proj-6.png',
    highlight: false,
  },
];

export const skills = {
  frontend: {
    label: "Frontend Development",
    level: 95,
    color: "#2878ff",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 93 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5", level: 98 },
      { name: "CSS3", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux", level: 85 },
      { name: "Framer Motion", level: 82 },
    ],
  },
  backend: {
    label: "Backend Development",
    level: 92,
    color: "#7c3aed",
    items: [
      { name: "Node.js", level: 93 },
      { name: "Express.js", level: 90 },
      { name: "NestJS", level: 85 },
      { name: "Python", level: 92 },
      { name: "FastAPI", level: 88 },
      { name: "REST API", level: 95 },
      { name: "GraphQL", level: 80 },
    ],
  },
  ai: {
    label: "Artificial Intelligence",
    level: 90,
    color: "#06b6d4",
    items: [
      { name: "OpenAI API", level: 93 },
      { name: "Gemini API", level: 82 },
      { name: "Claude API", level: 82 },
      { name: "LangChain", level: 88 },
      { name: "LangGraph", level: 82 },
      { name: "RAG Architecture", level: 90 },
      { name: "Vector Databases", level: 87 },
      { name: "TensorFlow", level: 80 },
      { name: "PyTorch", level: 78 },
      { name: "Computer Vision", level: 80 },
      { name: "NLP", level: 85 },
    ],
  },
  databases: {
    label: "Databases",
    level: 85,
    color: "#10b981",
    items: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Prisma ORM", level: 83 },
      { name: "Qdrant", level: 82 },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    level: 82,
    color: "#f59e0b",
    items: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Google Cloud", level: 78 },
      { name: "GitHub Actions", level: 83 },
      { name: "CI/CD", level: 82 },
      { name: "Linux", level: 85 },
    ],
  },
};

export const blogPosts = [
  {
    id: "blog-1",
    title: "Building Production-Ready RAG Systems",
    subtitle: "Architecture patterns for enterprise AI chatbots",
    category: "AI / LLM",
    readTime: "8 min read",
    date: "2025",
    excerpt:
      "Deep dive into building Retrieval-Augmented Generation pipelines that scale — from chunking strategies and embedding models to vector database optimization and LLM prompt engineering.",
    tags: ["RAG", "LLM", "Vector DB", "Python", "FastAPI"],
  },
  {
    id: "blog-2",
    title: "Full Stack Architecture with Next.js & FastAPI",
    subtitle: "Designing scalable SaaS backends",
    category: "Full Stack",
    readTime: "6 min read",
    date: "2025",
    excerpt:
      "How to structure a modern full-stack application pairing Next.js on the frontend with a FastAPI backend, PostgreSQL, and Redis — including auth, caching, and deployment patterns.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript"],
  },
  {
    id: "blog-3",
    title: "Computer Vision in Healthcare Applications",
    subtitle: "Lessons from building DermaIQ",
    category: "AI / Computer Vision",
    readTime: "7 min read",
    date: "2024",
    excerpt:
      "Practical insights from developing an AI-powered skin image analysis platform — covering model selection, inference optimization, and the unique challenges of healthcare AI.",
    tags: ["Computer Vision", "TensorFlow", "OpenCV", "Healthcare"],
  },
  {
    id: "blog-4",
    title: "LangChain & LangGraph for AI Agents",
    subtitle: "Building autonomous AI workflows",
    category: "AI Agents",
    readTime: "9 min read",
    date: "2024",
    excerpt:
      "Practical guide to orchestrating complex AI pipelines with LangChain and LangGraph — from simple chains to multi-step agent workflows with state management.",
    tags: ["LangChain", "LangGraph", "AI Agents", "Python"],
  },
  {
    id: "blog-5",
    title: "React Performance Patterns at Scale",
    subtitle: "Optimizing large TypeScript applications",
    category: "Frontend",
    readTime: "5 min read",
    date: "2024",
    excerpt:
      "Techniques for keeping React applications fast as they grow — memoization strategies, bundle splitting, state architecture, and measuring what actually matters.",
    tags: ["React", "TypeScript", "Performance", "Frontend"],
  },
  {
    id: "blog-6",
    title: "Designing Developer Tools with AI",
    subtitle: "Lessons from CodePilot AI",
    category: "Developer Tools",
    readTime: "6 min read",
    date: "2023",
    excerpt:
      "How to integrate LLM APIs into developer productivity tools — UX considerations, prompt design, latency management, and building interactive chat interfaces.",
    tags: ["OpenAI API", "Developer Tools", "UX", "TypeScript"],
  },
];

export const services = [
  {
    id: "svc-1",
    title: "AI Application Development",
    description: "RAG systems, LLM integrations, AI chatbots, and custom AI-powered features.",
  },
  {
    id: "svc-2",
    title: "Full Stack Development",
    description: "End-to-end web applications with React/Next.js frontends and Node.js/Python backends.",
  },
  {
    id: "svc-3",
    title: "SaaS Platform Architecture",
    description: "Scalable, cloud-ready SaaS products with modern authentication and infrastructure.",
  },
  {
    id: "svc-4",
    title: "Technical Consultation",
    description: "Architecture reviews, technology selection, and AI strategy for your product.",
  },
];

// Nova AI knowledge base for the assistant
export const novaKnowledge = {
  greetings: [
    "Hello! I'm **Nova**, Daniel's personal AI assistant. 👋\n\nI know everything about Daniel's work, skills, and projects. Ask me anything — I'm here to help you get to know him.",
    "Hey there! Nova here. ✨\n\nI'm your guide to Daniel's portfolio. Ask me about his projects, skills, experience, or how to work with him.",
  ],
  intents: [
    {
      patterns: ["who", "about", "tell me", "introduce", "summary", "developer", "yourself", "daniel"],
      response: `**Daniel Lixandru Nicolae** is an AI & Full Stack Developer based in 📍 Bucharest, Romania.\n\n🧠 **8+ years** of experience building scalable web applications, SaaS platforms, and AI-driven solutions.\n\n🎯 **Core focus:** LLM applications, RAG systems, computer vision, and full-stack engineering with React, Next.js, TypeScript, Node.js, and Python.\n\nHe's passionate about high-performance software that solves real business challenges — from intelligent automation to enterprise AI platforms.`,
      followups: ["What projects has he built?", "What technologies does he use?", "How can I hire him?"],
    },
    {
      patterns: ["tech", "technologies", "stack", "skills", "language", "framework", "tools", "know", "expert"],
      response: `Daniel's technical stack spans 5 domains:\n\n🎨 **Frontend**\nReact.js · Next.js · TypeScript · Tailwind CSS · Redux · Framer Motion\n\n⚙️ **Backend**\nNode.js · Python · FastAPI · NestJS · GraphQL · REST API\n\n🤖 **AI / ML**\nOpenAI API · LangChain · LangGraph · RAG Architecture · TensorFlow · PyTorch · Computer Vision · NLP\n\n🗄️ **Databases**\nPostgreSQL · MongoDB · Redis · Qdrant · Prisma ORM\n\n☁️ **Cloud & DevOps**\nDocker · AWS · Google Cloud · GitHub Actions · CI/CD · Linux`,
      followups: ["Tell me about his AI skills", "What frontend frameworks does he use?", "What projects has he built?"],
    },
    {
      patterns: ["project", "built", "portfolio", "work", "app", "platform", "build"],
      response: `Daniel has shipped **6 major projects**:\n\n📋 **AI Knowledge Assistant Platform** *(2025)*\nEnterprise RAG chatbot with document intelligence — Next.js, FastAPI, Qdrant, OpenAI\n\n💼 **SmartRecruit AI** *(2024)*\nAI recruitment automation with NLP candidate matching — React, Python, ML\n\n🩺 **DermaIQ** *(2024)*\nAI medical image analysis for skin conditions — TensorFlow, OpenCV, FastAPI\n\n💻 **CodePilot AI** *(2023)*\nAI coding assistant for developers — Next.js, OpenAI API\n\n🛍️ **ShopMind AI** *(2023)*\nAI-powered e-commerce with recommendations — React, Stripe\n\n🎭 **FaceSwap AI** *(2022)*\nReal-time deep synthesis platform — PyTorch, OpenCV`,
      followups: ["Tell me about the RAG project", "What AI technologies does he use?", "How can I see the projects?"],
    },
    {
      patterns: ["rag", "knowledge assistant", "document", "enterprise ai", "chatbot"],
      response: `The **AI Knowledge Assistant Platform** is Daniel's most recent and complex project *(Jan–May 2025)*.\n\n🔍 **What it does:** Lets enterprises search and extract insights from large document repositories using AI.\n\n⚙️ **How it works:**\n→ RAG pipelines with LLMs + vector embeddings\n→ Semantic search via Qdrant vector database\n→ Full-stack: Next.js frontend + FastAPI backend\n→ Auth, document processing, AI conversation engine\n\n🛠️ **Stack:** Next.js · TypeScript · Python · FastAPI · PostgreSQL · Qdrant · OpenAI API`,
      followups: ["What other AI projects has he built?", "What is RAG architecture?", "How can I contact Daniel?"],
    },
    {
      patterns: ["experience", "job", "company", "work history", "career", "employ", "worked"],
      response: `**3 professional roles** across 8+ years:\n\n🚀 **Senior AI Full Stack Developer**\nNovaAI Technologies · 2022–Present · Remote\n→ AI-powered SaaS apps, LLM/RAG solutions, cloud-ready systems\n→ React · Next.js · TypeScript · Node.js · Python · AI APIs\n\n💡 **Full Stack Developer**\nDigital Solutions Lab · 2019–2021 · Remote\n→ REST APIs, SaaS platforms, e-commerce solutions\n→ React · Node.js · TypeScript · Python\n\n🔧 **Software Developer**\nWebTech Romania · 2017–2019 · On-site\n→ Web applications, backend APIs, databases\n→ JavaScript · PHP · Python · MySQL`,
      followups: ["What is he currently working on?", "What skills does he have?", "How can I hire him?"],
    },
    {
      patterns: ["contact", "email", "reach", "hire", "freelance", "message", "get in touch", "work with", "collaboration"],
      response: `Several ways to connect with Daniel:\n\n📧 **Email**\nuhajucewog80@gmail.com\n\n💬 **Message Center**\nUse the ✉️ Contact app in this OS\n\n📅 **Book a Meeting**\nUse the 📅 Meeting app to schedule a call\n\n🐱 **GitHub**\ngithub.com/TOPDEV99999\n\n📍 **Location**\nBucharest, Romania (Remote-friendly, EET UTC+2/+3)\n\nHe's currently **open to opportunities** — freelance projects, full-time remote roles, and AI consulting.`,
      followups: ["What services does he offer?", "What is his availability?", "What are his rates?"],
    },
    {
      patterns: ["education", "degree", "university", "study", "academic", "background"],
      response: `🎓 **Bachelor of Science in Computer Science**\nUniversity of Bucharest · 2013–2017\n\n📚 **Coursework covered:**\n→ Software engineering & algorithms\n→ Artificial intelligence & machine learning\n→ Databases & data systems\n→ Computer networks & operating systems\n→ Full-stack application development\n\nThis foundation, combined with 8+ years of hands-on experience, makes Daniel a well-rounded engineer who understands both theory and production-grade implementation.`,
      followups: ["What technologies did he learn?", "What projects has he built?", "Tell me about his experience"],
    },
    {
      patterns: ["ai", "llm", "machine learning", "neural", "model", "artificial intelligence", "gpt", "openai"],
      response: `AI is Daniel's **core specialization**. Here's his AI toolkit:\n\n🤖 **LLM APIs**\nOpenAI GPT-4 · Gemini API · Claude API\n\n🔗 **Orchestration**\nLangChain · LangGraph · Custom agent workflows\n\n📚 **RAG & Search**\nRAG architecture · Vector databases (Qdrant) · Embeddings\n\n👁️ **Computer Vision**\nTensorFlow · PyTorch · OpenCV · Image classification\n\n📝 **NLP**\nText classification · Information extraction · NLP pipelines\n\nHe's built **production AI systems** serving real enterprise use cases — not just prototypes.`,
      followups: ["Show me his AI projects", "What is RAG?", "How can he help with AI?"],
    },
    {
      patterns: ["service", "offer", "help", "what can", "do for", "provide", "consulting"],
      response: `Daniel offers **4 main services**:\n\n🤖 **AI Application Development**\nRAG systems, LLM integrations, AI chatbots, custom AI features\n\n💻 **Full Stack Development**\nEnd-to-end web apps — React/Next.js + Node.js/Python backends\n\n🏗️ **SaaS Platform Architecture**\nScalable, cloud-ready products with modern auth & infrastructure\n\n🎯 **Technical Consultation**\nArchitecture reviews, tech stack selection, AI strategy\n\nInterested in working together? Use the **Meeting** or **Contact** app to get in touch.`,
      followups: ["Book a meeting", "How can I contact him?", "What projects has he built?"],
    },
    {
      patterns: ["location", "where", "remote", "timezone", "available", "availability", "hire"],
      response: `📍 **Location:** Bucharest, Romania\n⏰ **Timezone:** EET (UTC+2 / UTC+3 in summer)\n🌐 **Work style:** Fully remote since 2019\n\n✅ **Currently open to:**\n→ Freelance & contract projects\n→ Full-time remote positions\n→ AI consulting engagements\n→ Long-term collaborations\n\nDaniel is responsive and async-friendly — book a call via the Meeting app or drop a message in the Contact app.`,
      followups: ["Book a meeting", "What services does he offer?", "How can I contact him?"],
    },
    {
      patterns: ["python", "fastapi", "node", "react", "nextjs", "typescript", "langchain"],
      response: `Daniel is highly proficient across his stack:\n\n🐍 **Python** — 92% proficiency\nFastAPI, TensorFlow, PyTorch, LangChain, data pipelines\n\n⚛️ **React / Next.js** — 95% / 93%\nFull product UIs, SSR, API routes, performance optimization\n\n📘 **TypeScript** — 92%\nStrong typing, complex generics, large-scale codebases\n\n🔗 **LangChain / LangGraph** — 88% / 82%\nAgent workflows, RAG chains, multi-step AI pipelines\n\nAll proficiency levels are based on years of hands-on production experience.`,
      followups: ["What projects has he built?", "What is his full stack?", "Tell me about his AI work"],
    },
    {
      patterns: ["rate", "price", "cost", "salary", "budget", "charge", "how much"],
      response: `For pricing and rates, please get in touch directly — Daniel tailors his engagement model to the project scope and requirements.\n\n📅 **Best approach:** Book a free 30-minute consultation call via the Meeting app. He'll discuss your project, provide an estimate, and answer any questions.\n\n📧 Or email: uhajucewog80@gmail.com`,
      followups: ["Book a meeting", "What services does he offer?", "How can I contact him?"],
    },
  ],
  fallback:
    "I don't have specific data on that, but I'd love to connect you with Daniel directly.\n\n📧 **Email:** uhajucewog80@gmail.com\n💬 **Message Center:** Use the ✉️ Contact app\n📅 **Meeting:** Use the 📅 Meeting app to book a call",
};
