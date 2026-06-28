import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  Twitter,
  CodeSquare,
  Computer,
  Sparkles,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

const App = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<{
    title: string;
    company: string;
    duration: string;
    description: string;
    technologies: string[];
    achievements: string[];
  }>({
    title: "",
    company: "",
    duration: "",
    description: "",
    technologies: [],
    achievements: [],
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (selectedExperience.title) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedExperience({
          title: "",
          company: "",
          duration: "",
          description: "",
          technologies: [],
          achievements: [],
        });
        setShowPhotoModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedExperience]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const ring = document.getElementById("cursor-ring");
    if (!ring) return;
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest('[onclick]');
      ring.classList.toggle("hovering", !!isInteractive);
    };
    window.addEventListener("mouseover", handleHover);
    return () => window.removeEventListener("mouseover", handleHover);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["home", "experience", "skills", "projects"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveNav(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-accent-orange/20 flex items-center justify-center animate-orbit">
              <div className="w-3 h-3 bg-accent-orange rounded-full"></div>
            </div>
            <div className="absolute w-28 h-28 rounded-full border border-accent-amber/10 animate-spin-reverse"></div>
            <div className="absolute w-36 h-36 rounded-full border border-accent-orange/5"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary animate-pulse">
              Loading Portfolio
            </h2>
            <div className="flex justify-center space-x-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-accent-orange rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  const skills = [
    {
      name: "Frontend Development",
      level: 95,
      icon: <Code />,
      color: "from-accent-orange to-accent-amber",
      proofOfWork:
        "Built dynamic UIs including a full dashboard and AI-powered website builder.",
    },
    {
      name: "Backend Development",
      level: 88,
      icon: <Database className="w-6 h-6" />,
      color: "from-accent-amber to-accent-warm",
      proofOfWork:
        "Created REST APIs and backend logic for CRUD systems and financial tools.",
    },
    {
      name: "UI/UX Design",
      level: 82,
      icon: <Palette className="w-6 h-6" />,
      color: "from-accent-warm to-accent-orange",
      proofOfWork:
        "Designed responsive, modern UIs with custom animations and gradients.",
    },
    {
      name: "Full Stack",
      level: 90,
      icon: <Globe className="w-6 h-6" />,
      color: "from-accent-orange to-accent-deep-orange",
      proofOfWork:
        "Built complete CRUD systems with auth, real-time updates, and clean REST API integrations.",
    },
    {
      name: "DSA",
      icon: <CodeSquare />,
      color: "from-accent-amber to-accent-orange",
      proofOfWork:
        "Solved 300+ problems on LeetCode and CodeChef. Applied DSA in quiz generators and optimized data flows.",
    },
  ];

  const experiences = [
    {
      title: "Google Summer of Code 2026 Student",
      icon: Github,
      company: "Internet Archive",
      duration: "May 2026 - Present",
      description:
        "Building an AI-assisted Chrome extension for the Wayback Machine using Chrome Prompt API and on-device Gemini Nano. Implemented summarization pipeline with content extraction, service worker, and overlay UI for archived pages.",
      technologies: ["genAI", "Chrome Extension", "JavaScript", "Open Source"],
      achievements: [],
    },
    {
      title: "Problem Setting Intern",
      icon: Computer,
      company: "AlgoUniversity",
      duration: "June 2026 - Present",
      description:
        "Selected for AlgoUniversity's Summer 2026 internship program to contribute to AI-powered educational technology initiatives. Working on a chat-first AI Socratic tutor for System Design.",
      technologies: ["DSA", "System Design", "TypeScript", "C++"],
      achievements: [],
    },
    {
      title: "Full Stack Developer",
      icon: Globe,
      company: "The Right Doctors",
      duration: "June 2025 - July 2025",
      description:
        "Full Stack Developer Intern where I optimized APIs, fixed key bugs, and built robust CRUD features.",
      technologies: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB"],
      achievements: [
        "Optimized API calls across multiple Angular components, reducing redundant requests",
        "Resolved critical frontend and backend bugs, enhancing reliability",
        "Built a full-stack CRUD module with Angular, Node.js, and MongoDB",
        "Implemented clean UI components with real-time form validation",
      ],
    },
    {
      title: "Content Developer",
      icon: Computer,
      company: "Eklavya.Me",
      duration: "May 2024 - Jan 2025",
      description:
        "Created educational videos on programming, data structures, and career guidance for an ed-tech platform.",
      technologies: ["Data Structures", "Algorithms", "C++", "JavaScript"],
      achievements: [
        "Created engaging educational video content for students",
        "Improved student exam readiness with visual explanations",
        "Delivered high-quality content on schedule consistently",
      ],
    },
  ];

  const projects = [
    {
      title: "ChatAI",
      description:
        "An AI chat platform unifying multiple language models (GPT-4o, Deepseek, Gemini) with intelligent conversation management, streaming responses, and OTP-based security.",
      technologies: ["React.js", "Express.js", "Node.js", "Prisma", "PostgreSQL", "JWT"],
      github: "https://github.com/sdass1918/ChatAI-Project",
      live: "https://project-chatai.vercel.app/",
    },
    {
      title: "Adept: Chrome Extension AI Helper",
      description:
        "Privacy-first browser extension leveraging Chrome's experimental Summarizer, Rewriter, and Translator APIs for on-device text processing with smart context menu integration.",
      technologies: ["Chrome Extensions", "JavaScript", "Chrome AI", "Context Menus"],
      github: "https://github.com/sdass1918/on-device-ai-extension",
      live: "https://youtu.be/1FKCLkK719o?si=xkZ4VlcsZrkTwaOe",
    },
    {
      title: "Agentic AI Claim Verifier",
      description:
        "Agentic AI system using Tavily Search API for real-time fact-checking. The agent autonomously verifies claims by scouring the internet for evidence and counter-arguments.",
      technologies: ["Express.js", "Node.js", "React", "Gemini API", "Tavily"],
      github: "https://github.com/sdass1918/Claim-Verifier-AI-Agent",
      live: "https://claim-verifier-ai-agent-wcir.vercel.app/",
    },
    {
      title: "Nirvaan - AI Website Builder",
      description:
        "AI-powered full-stack website builder that generates and previews functional websites from natural language prompts using WebContainers for in-browser execution.",
      technologies: ["React", "Node.js", "Express", "WebContainers", "Gemini API"],
      github: "https://github.com/sdass1918/Nirvaan---An-AI-website-builder",
      live: "https://nirvaan-an-ai-website-builder.vercel.app/",
    },
    {
      title: "AI Insurance Claim System",
      description:
        "Built at Bajaj HackRx 6.0, this MERN-based RAG app automates insurance claim approvals using LangChain, Gemini, and Pinecone with high accuracy.",
      technologies: ["Express.js", "Node.js", "LangChain", "Gemini", "Pinecone"],
      github: "https://github.com/sdass1918/bajajHackrx",
      live: "https://bajajhackrx-0i4v.onrender.com",
    },
    {
      title: "AI Transcript Summarizer",
      description:
        "Processes conversations, lectures, and meetings into clear summaries using LLMs with fine-tuned prompts. Includes email delivery via Nodemailer.",
      technologies: ["Express.js", "Node.js", "Groq", "NLP", "Nodemailer"],
      github: "https://github.com/sdass1918/AI-Summarizer",
      live: "https://ai-summarizer-frontend-shtm.vercel.app/",
    },
    {
      title: "Personal Finance Visualizer",
      description:
        "Full-stack finance tracker with categorized expense management, budget monitoring, and data visualization using Next.js and Recharts.",
      technologies: ["Next.js", "React", "shadcn/ui", "Recharts", "MongoDB"],
      github: "https://github.com/sdass1918/Financial-Manager",
      live: "https://financial-manager-k3b8.vercel.app/",
    },
    {
      title: "Quizzite - Quiz Builder",
      description:
        "Full-stack quiz app for generating topic-based quizzes and auto-creating shareable Google Forms with Appwrite auth and Open Trivia DB integration.",
      technologies: ["React", "Node.js", "Tailwind CSS", "Appwrite", "Google Apps Script"],
      github: "https://github.com/sdass1918/Musicx",
      live: "https://quizzite-wxuu.onrender.com/",
    },
  ];

  return (
    <>
      {/* Minimal Cursor */}
      <div
        className="cursor-ball"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transition: "left 0.08s ease-out, top 0.08s ease-out",
        }}
      />
      <div
        className="cursor-ring"
        id="cursor-ring"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transition: "left 0.15s ease-out, top 0.15s ease-out, width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 mac-nav transition-all duration-300 ${
          scrollY > 50 ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-text-primary font-semibold text-sm"
          >
            <Terminal className="w-4 h-4 text-accent-orange" />
            <span>sdass</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeNav === item.id
                    ? "text-accent-orange bg-accent-orange/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://drive.google.com/drive/folders/1rghJO4_FtQlrDMr4p4H9f8XxJY8GnDBN?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 transition-all duration-200 flex items-center gap-1"
            >
              Resume <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-primary mac-vibrancy">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeNav === item.id
                      ? "text-accent-orange bg-accent-orange/10"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="bg-dark-primary text-text-primary min-h-screen relative overflow-x-hidden">
        {/* Grid Background */}
        <div className="fixed inset-0 grid-background pointer-events-none" />

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 relative pt-12"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-8 animate-fade-in-up">
              {/* Profile Image */}
              <div className="mb-8 flex justify-center">
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="relative group cursor-none"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-orange to-accent-amber rounded-[20px] opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="w-28 h-28 rounded-[18px] overflow-hidden border border-border-primary bg-dark-tertiary flex items-center justify-center relative">
                    <img
                      src="photo.jpeg"
                      alt="Profile"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-[18px] bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mb-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight text-text-primary tracking-tight">
                  Hi, I'm Sudipta
                </h1>
                <p className="text-base text-text-secondary max-w-xl mx-auto">
                  Full Stack & DevOps Engineer from India
                </p>
              </div>

              <p className="text-sm text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed animate-fade-in-up animation-delay-200 px-4">
                I craft cutting-edge applications and robust digital solutions.
                From intuitive interfaces and serverless backends to scalable
                infrastructure with AWS, Docker, and Cloudflare — I turn complex
                concepts into seamless experiences.
              </p>

              {/* Status */}
              <div className="flex justify-center mb-10 animate-fade-in-up animation-delay-300">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/25 shadow-lg shadow-accent-green/5">
                  <span className="w-2 h-2 rounded-full bg-accent-green shadow-sm shadow-accent-green/50" />
                  <span className="text-xs font-semibold text-accent-green tracking-wider">
                    OPEN TO WORK
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fade-in-up animation-delay-400">
              <button
                onClick={() => scrollToSection("projects")}
                className="group bg-accent-orange hover:bg-accent-warm text-dark-primary px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-accent-orange/20"
              >
                <Sparkles className="w-4 h-4" />
                View My Work
              </button>
              <a
                href="https://drive.google.com/drive/folders/1rghJO4_FtQlrDMr4p4H9f8XxJY8GnDBN?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border-primary hover:border-accent-orange/40 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 hover:bg-accent-orange/5 flex items-center gap-2 text-sm text-text-secondary"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-500">
              {[
                {
                  icon: Twitter,
                  href: "https://x.com/Sudipta1918",
                  label: "Twitter",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sudipta-das19/",
                  label: "LinkedIn",
                },
                {
                  icon: Github,
                  href: "https://github.com/sdass1918",
                  label: "GitHub",
                },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-orange transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-700">
              <button
                onClick={() => scrollToSection("experience")}
                className="text-text-secondary hover:text-accent-orange transition-all duration-300 animate-bounce-slow"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 animate-fade-in-up">
              <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-full mb-4 inline-block">
                Career
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Experience
              </h2>
              <div className="mac-divider max-w-xs mx-auto mb-4" />
              <p className="text-sm text-text-secondary max-w-lg mx-auto">
                A timeline of my professional journey in full-stack development.
              </p>
            </div>

            <div className="space-y-5">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedExperience(exp)}
                    className="mac-card p-5 cursor-pointer animate-fade-in-up group"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-orange/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-accent-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-text-tertiary">
                            {exp.duration}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-text-primary mb-0.5">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-accent-orange/80 mb-3">
                          {exp.company}
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-accent-orange/8 text-accent-orange/70 rounded-md text-[10px] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <div className="w-8 h-8 rounded-full bg-accent-orange/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight className="w-4 h-4 text-accent-orange" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Modal - Mac Style */}
        {selectedExperience.title && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-blur-intensify">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() =>
                setSelectedExperience({
                  title: "",
                  company: "",
                  duration: "",
                  description: "",
                  technologies: [],
                  achievements: [],
                })
              }
            />
            <div className="mac-window w-full max-w-lg relative animate-mac-spring">
              {/* Mac Titlebar */}
              <div className="mac-titlebar">
                <div
                  className="mac-dot red"
                  onClick={() =>
                    setSelectedExperience({
                      title: "",
                      company: "",
                      duration: "",
                      description: "",
                      technologies: [],
                      achievements: [],
                    })
                  }
                />
                <div className="mac-dot yellow" />
                <div className="mac-dot green" />
                <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-text-tertiary font-medium truncate max-w-[60%]">
                  {selectedExperience.title}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {selectedExperience.title}
                  </h3>
                  <p className="text-sm text-accent-orange font-medium">
                    {selectedExperience.company}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {selectedExperience.duration}
                  </p>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-5">
                  {selectedExperience.description}
                </p>

                {selectedExperience.achievements?.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedExperience.achievements.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-text-secondary leading-relaxed flex gap-2"
                        >
                          <span className="text-accent-orange mt-0.5 flex-shrink-0">
                            &rarr;
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-primary">
                  {selectedExperience.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-accent-orange/8 text-accent-orange/80 rounded-md text-[10px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Modal - Mac Style */}
        {showPhotoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-blur-intensify">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowPhotoModal(false)}
            />
            <div className="mac-window w-auto relative animate-mac-spring max-w-[90vw] max-h-[90vh]">
              <div className="mac-titlebar">
                <div className="mac-dot red" onClick={() => setShowPhotoModal(false)} />
                <div className="mac-dot yellow" />
                <div className="mac-dot green" />
                <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-text-tertiary font-medium">
                  photo.jpeg
                </span>
              </div>
              <div className="p-1">
                <img
                  src="photo.jpeg"
                  alt="Profile"
                  className="max-w-full max-h-[75vh] rounded-b-lg object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 animate-fade-in-up">
              <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-full mb-4 inline-block">
                Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Skills
              </h2>
              <div className="mac-divider max-w-xs mx-auto mb-4" />
            </div>

            <div className="mac-card p-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent-orange/5 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange flex-shrink-0 group-hover:bg-accent-orange/20 transition-colors duration-300">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {skill.proofOfWork}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 animate-fade-in-up">
              <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-full mb-4 inline-block">
                Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Projects
              </h2>
              <div className="mac-divider max-w-xs mx-auto mb-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((project, index) => {
                const isExpanded = expandedProject === index;
                return (
                  <div
                    key={index}
                    className="mac-card p-4 animate-fade-in-up flex flex-col group"
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-orange transition-colors duration-200">
                        {project.title}
                      </h3>
                      <Terminal className="w-3.5 h-3.5 text-text-tertiary group-hover:text-accent-orange transition-colors duration-200" />
                    </div>

                    <p
                      className={`text-xs text-text-secondary leading-relaxed mb-3 ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {project.description}
                    </p>

                    <button
                      className="text-[10px] text-accent-orange/60 hover:text-accent-orange transition-colors mb-3 self-start font-medium"
                      onClick={() =>
                        setExpandedProject(isExpanded ? null : index)
                      }
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 bg-accent-orange/8 text-accent-orange/60 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-border-primary/50">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-accent-orange transition-colors p-1.5 rounded-md hover:bg-accent-orange/10"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-accent-orange transition-colors p-1.5 rounded-md hover:bg-accent-orange/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border-primary">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent-orange" />
              <p className="text-xs text-text-secondary">
                &copy; 2025 Sudipta Das
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Mail, href: "mailto:sudiptadofficial@gmail.com" },
                { icon: Phone, href: "tel:9905612470" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sudipta-das19/" },
                { icon: Github, href: "https://github.com/sdass1918" },
                { icon: Twitter, href: "https://x.com/Sudipta1918" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-accent-orange transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
