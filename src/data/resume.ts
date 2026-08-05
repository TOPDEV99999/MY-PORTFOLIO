// ─── DANIEL OS — Resume Data ─────────────────────────────────────────────────
// UI layer: re-exports everything from shared/portfolio-data and adds
// React/UI-specific fields (colors, image paths, local chatbot intents).
//
// The Netlify Function imports directly from shared/portfolio-data — no duplication.
// Update shared/portfolio-data.ts to change any content; this file stays thin.
// ─────────────────────────────────────────────────────────────────────────────

// ── Re-export shared data ─────────────────────────────────────────────────────
export {
  profile,
  education,
  experiences,
  projects,
  services,
} from "../../shared/portfolio-data";

// ── Import shared data for local enrichment ───────────────────────────────────
import {
  profile as _profile,
  experiences as _experiences,
  projects as _projects,
  skills as _skills,
  services as _services,
} from "../../shared/portfolio-data";

// ── UI-enriched skills (adds color + proficiency level for the dashboard) ─────
export const skills = {
  frontend: {
    ..._skills.frontend,
    level: 95,
    color: "#2878ff",
    items: [
      { name: "React.js",       level: 95 },
      { name: "Next.js",        level: 93 },
      { name: "TypeScript",     level: 92 },
      { name: "JavaScript",     level: 95 },
      { name: "HTML5",          level: 98 },
      { name: "CSS3",           level: 95 },
      { name: "Tailwind CSS",   level: 92 },
      { name: "Redux",          level: 85 },
      { name: "Framer Motion",  level: 82 },
    ],
  },
  backend: {
    ..._skills.backend,
    level: 92,
    color: "#7c3aed",
    items: [
      { name: "Node.js",     level: 93 },
      { name: "Express.js",  level: 90 },
      { name: "NestJS",      level: 85 },
      { name: "Python",      level: 92 },
      { name: "FastAPI",     level: 88 },
      { name: "REST API",    level: 95 },
      { name: "GraphQL",     level: 80 },
    ],
  },
  ai: {
    ..._skills.ai,
    level: 90,
    color: "#06b6d4",
    items: [
      { name: "OpenAI API",       level: 93 },
      { name: "Gemini API",       level: 82 },
      { name: "Claude API",       level: 82 },
      { name: "LangChain",        level: 88 },
      { name: "LangGraph",        level: 82 },
      { name: "RAG Architecture", level: 90 },
      { name: "Vector Databases", level: 87 },
      { name: "TensorFlow",       level: 80 },
      { name: "PyTorch",          level: 78 },
      { name: "Computer Vision",  level: 80 },
      { name: "NLP",              level: 85 },
    ],
  },
  databases: {
    ..._skills.databases,
    level: 85,
    color: "#10b981",
    items: [
      { name: "PostgreSQL",  level: 90 },
      { name: "MongoDB",     level: 85 },
      { name: "Redis",       level: 80 },
      { name: "Prisma ORM",  level: 83 },
      { name: "Qdrant",      level: 82 },
    ],
  },
  cloud: {
    ..._skills.cloud,
    level: 82,
    color: "#f59e0b",
    items: [
      { name: "Docker",          level: 85 },
      { name: "AWS",             level: 80 },
      { name: "Google Cloud",    level: 78 },
      { name: "GitHub Actions",  level: 83 },
      { name: "CI/CD",           level: 82 },
      { name: "Linux",           level: 85 },
    ],
  },
};

// ── Blog posts (UI-only, not relevant for the chatbot) ────────────────────────
export const blogPosts = [
  { id: "blog-1", title: "Building Production-Ready RAG Systems",         subtitle: "Architecture patterns for enterprise AI chatbots",   category: "AI / LLM",              readTime: "8 min read", date: "2025", excerpt: "Deep dive into building Retrieval-Augmented Generation pipelines that scale — from chunking strategies and embedding models to vector database optimization and LLM prompt engineering.", tags: ["RAG", "LLM", "Vector DB", "Python", "FastAPI"] },
  { id: "blog-2", title: "Full Stack Architecture with Next.js & FastAPI",subtitle: "Designing scalable SaaS backends",                   category: "Full Stack",            readTime: "6 min read", date: "2025", excerpt: "How to structure a modern full-stack application pairing Next.js on the frontend with a FastAPI backend, PostgreSQL, and Redis.", tags: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript"] },
  { id: "blog-3", title: "Computer Vision in Healthcare Applications",    subtitle: "Lessons from building DermaIQ",                     category: "AI / Computer Vision",  readTime: "7 min read", date: "2024", excerpt: "Practical insights from developing an AI-powered skin image analysis platform — covering model selection, inference optimization, and healthcare AI challenges.", tags: ["Computer Vision", "TensorFlow", "OpenCV", "Healthcare"] },
  { id: "blog-4", title: "LangChain & LangGraph for AI Agents",           subtitle: "Building autonomous AI workflows",                  category: "AI Agents",             readTime: "9 min read", date: "2024", excerpt: "Practical guide to orchestrating complex AI pipelines with LangChain and LangGraph — from simple chains to multi-step agent workflows.", tags: ["LangChain", "LangGraph", "AI Agents", "Python"] },
  { id: "blog-5", title: "React Performance Patterns at Scale",           subtitle: "Optimizing large TypeScript applications",          category: "Frontend",              readTime: "5 min read", date: "2024", excerpt: "Techniques for keeping React applications fast as they grow — memoization, bundle splitting, state architecture.", tags: ["React", "TypeScript", "Performance", "Frontend"] },
  { id: "blog-6", title: "Designing Developer Tools with AI",             subtitle: "Lessons from CodePilot AI",                        category: "Developer Tools",       readTime: "6 min read", date: "2023", excerpt: "How to integrate LLM APIs into developer productivity tools — UX considerations, prompt design, latency management.", tags: ["OpenAI API", "Developer Tools", "UX", "TypeScript"] },
];

// ── Local Nova knowledge base (used as UI fallback when no API is available) ──
// The Netlify Function uses Gemini + buildSystemPrompt() from shared/ instead.
// Keep this in sync with shared/portfolio-data content for consistency.
export const novaKnowledge = {
  greetings: [
    "Hello! I'm **Nova**, Daniel's personal AI assistant. 👋\n\nI know everything about Daniel's work, skills, and projects. Ask me anything — I'm here to help you get to know him.",
    "Hey there! Nova here. ✨\n\nI'm your guide to Daniel's portfolio. Ask me about his projects, skills, experience, or how to work with him.",
  ],
  intents: [
    {
      patterns: ["who", "about", "tell me", "introduce", "summary", "developer", "yourself", "daniel"],
      response: `**${_profile.name}** is an AI & Full Stack Developer based in 📍 ${_profile.location}.\n\n🧠 **${_profile.yearsExperience}+ years** of experience building scalable web apps, SaaS platforms, and AI-driven solutions.\n\n🎯 **Core focus:** LLM applications, RAG systems, computer vision, and full-stack engineering with React, Next.js, TypeScript, Node.js, and Python.`,
      followups: ["What projects has he built?", "What technologies does he use?", "How can I hire him?"],
    },
    {
      patterns: ["tech", "technologies", "stack", "skills", "language", "framework", "tools", "know", "expert"],
      response: `Daniel's technical stack spans 5 domains:\n\n🎨 **Frontend**\nReact.js · Next.js · TypeScript · Tailwind CSS · Redux · Framer Motion\n\n⚙️ **Backend**\nNode.js · Python · FastAPI · NestJS · GraphQL · REST API\n\n🤖 **AI / ML**\nOpenAI API · LangChain · LangGraph · RAG Architecture · TensorFlow · PyTorch · Computer Vision · NLP\n\n🗄️ **Databases**\nPostgreSQL · MongoDB · Redis · Qdrant · Prisma ORM\n\n☁️ **Cloud & DevOps**\nDocker · AWS · Google Cloud · GitHub Actions · CI/CD · Linux`,
      followups: ["Tell me about his AI skills", "What projects has he built?"],
    },
    {
      patterns: ["project", "built", "portfolio", "work", "app", "platform", "build"],
      response: `Daniel has shipped **${_profile.projectsBuilt}+ projects**. Here are 6 major ones:\n\n` +
        _projects.map(p => `${p.name} *(${p.period.split('–')[1]?.trim()})* — ${p.category}`).join('\n'),
      followups: ["Tell me about the RAG project", "How can I see the projects?"],
    },
    {
      patterns: ["experience", "job", "company", "work history", "career", "employ", "worked"],
      response: `**${_profile.companiesWorked} professional roles** across ${_profile.yearsExperience}+ years:\n\n` +
        _experiences.map(e => `${e.current ? '🚀' : '💡'} **${e.position}** @ ${e.company} (${e.period})`).join('\n\n'),
      followups: ["What skills does he have?", "How can I hire him?"],
    },
    {
      patterns: ["contact", "email", "reach", "hire", "freelance", "message", "get in touch", "work with"],
      response: `📧 **Email:** ${_profile.email}\n🐱 **GitHub:** ${_profile.github}\n📍 **Location:** ${_profile.location}\n\nHe's currently **open to opportunities** — freelance, full-time remote, and AI consulting.`,
      followups: ["What services does he offer?", "Book a meeting"],
    },
    {
      patterns: ["education", "degree", "university", "study", "academic"],
      response: `🎓 **Bachelor of Science in Computer Science**\nUniversity of Bucharest · 2013–2017\n\nCoursework: software engineering, algorithms, AI/ML, databases, computer networks, operating systems.`,
      followups: ["What projects has he built?", "Tell me about his experience"],
    },
    {
      patterns: ["ai", "llm", "machine learning", "neural", "model", "artificial intelligence", "gpt", "openai", "rag"],
      response: `AI is Daniel's **core specialization**:\n\n🤖 **LLM APIs:** OpenAI GPT-4 · Gemini API · Claude API\n🔗 **Orchestration:** LangChain · LangGraph\n📚 **RAG & Search:** RAG architecture · Qdrant · Embeddings\n👁️ **Computer Vision:** TensorFlow · PyTorch · OpenCV\n\nHe's built **production AI systems** for real enterprise use cases.`,
      followups: ["Show me his AI projects", "How can he help with AI?"],
    },
    {
      patterns: ["service", "offer", "help", "what can", "do for", "provide", "consulting"],
      response: _services.map(s => `• **${s.title}:** ${s.description}`).join('\n\n'),
      followups: ["Book a meeting", "How can I contact him?"],
    },
    {
      patterns: ["location", "where", "remote", "timezone", "available", "availability"],
      response: `📍 **${_profile.location}** · EET (UTC+2/+3)\n🌐 Fully remote since 2019\n\n✅ Open to: freelance, contract, full-time remote, AI consulting.`,
      followups: ["Book a meeting", "What services does he offer?"],
    },
    {
      patterns: ["rate", "price", "cost", "salary", "budget", "how much"],
      response: `For rates and pricing, please reach out directly — Daniel tailors his engagement model to project scope.\n\n📅 Book a free 30-min consultation via the Meeting app.\n📧 Email: ${_profile.email}`,
      followups: ["Book a meeting", "How can I contact him?"],
    },
  ],
  fallback: `I don't have specific data on that. Feel free to reach out to Daniel directly:\n\n📧 **${_profile.email}**\n📅 Use the Meeting app to book a call`,
};
