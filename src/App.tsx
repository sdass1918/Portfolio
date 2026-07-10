import { useState, useEffect } from "react";
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
  Sparkles,
  ArrowUpRight,
  Terminal,
  FileText,
  Server,
  Cloud,
  Box,
  Activity,
  Triangle,
  Cpu,
  FileCode2,
  Layers,
  Workflow,
} from "lucide-react";

const App = () => {
  const [expandedProj, setExpandedProj] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedExp, setSelectedExp] = useState<{
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showPhoto, setShowPhoto] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  const titleText = "Sudipta";

  const [contributions, setContributions] = useState<{id: number; title: string; repo: string; url: string; number: number; state: string; merged: boolean}[]>([]);
  const [prFilter, setPrFilter] = useState<"merged" | "open" | "closed">("merged");
  const [prShowAll, setPrShowAll] = useState(false);

  const technicalSkills = [
    { name: "React", icon: Code },
    { name: "Next.js", icon: Globe },
    { name: "TypeScript", icon: FileCode2 },
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Cpu },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "Redis", icon: Activity },
    { name: "Prisma ORM", icon: Triangle },
    { name: "Mongoose", icon: Layers },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Radix UI", icon: Box },
    { name: "Material UI", icon: Box },
    { name: "JavaScript (ES6+)", icon: FileCode2 },
    { name: "C/C++", icon: CodeSquare },
    { name: "HTML/CSS", icon: Globe },
    { name: "Socket.io", icon: Workflow },
    { name: "GitHub", icon: Github },
    { name: "Turborepo", icon: Layers },
    { name: "Docker", icon: Box },
    { name: "Kafka", icon: Activity },
    { name: "AWS", icon: Cloud },
    { name: "Cloudflare", icon: Cloud },
  ];

  useEffect(() => {
    fetch(
      "https://api.github.com/search/issues?q=author:sdass1918+type:pr+is:public&sort=created&order=desc&per_page=50",
    )
      .then((r) => r.json())
      .then((d: {items?: {id: number; title: string; repository_url: string; html_url: string; number: number; state: string; pull_request?: {merged_at?: string}}[]}) => {
        if (d.items) {
          const formattedPrs = d.items.map((item) => {
            const repoParts = item.repository_url.split("/");
            const repoName = `${repoParts[repoParts.length - 2]}/${repoParts[repoParts.length - 1]}`;
            return {
              id: item.id,
              title: item.title,
              repo: repoName,
              url: item.html_url,
              number: item.number,
              state: item.state,
              merged: !!item.pull_request?.merged_at,
            };
          });
          setContributions(formattedPrs);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedExp.title) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedExp({
          title: "",
          company: "",
          duration: "",
          description: "",
          technologies: [],
          achievements: [],
        });
        setShowPhoto(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [selectedExp]);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const ring = document.getElementById("cursor-ring");
    if (!ring) return;
    const hover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      ring.classList.toggle(
        "hovering",
        !!t.closest("a, button, input, textarea, [role='button']"),
      );
    };
    window.addEventListener("mouseover", hover);
    return () => window.removeEventListener("mouseover", hover);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedChars(titleText.slice(0, i));
      if (i >= titleText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      for (const id of ["blogs", "projects", "skills", "experience", "home"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getCtx = () => {
      try {
        const AC = window.AudioContext || (window as unknown as {webkitAudioContext: {new(): AudioContext}}).webkitAudioContext;
        const c = new AC();
        if (c.state === "suspended") c.resume();
        return c;
      } catch { return null; }
    };
    const playClick = () => {
      const c = getCtx();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.connect(gain);
        gain.connect(c.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, c.currentTime + 0.03);
        gain.gain.setValueAtTime(0.06, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
        osc.start(c.currentTime);
        osc.stop(c.currentTime + 0.05);
      } catch { /* audio error */ }
    };
    const handler = () => playClick();
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-6 font-mono text-sm text-secondary">
            <span className="animate-pulse text-primary">_</span>
            <span>loading</span>
            <span className="animate-pulse text-primary">_</span>
          </div>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const nav = [
    { id: "home", label: "_home" },
    { id: "github-stats", label: "_github" },
    { id: "experience", label: "_experience" },
    { id: "skills", label: "_skills" },
    { id: "projects", label: "_projects" },
    { id: "blogs", label: "_blogs" },
  ];


  const experiences = [
    {
      title: "GSoC 2026 Student",
      icon: Github,
      company: "Internet Archive",
      duration: "May 2026 - Present",
      description:
        "Building an AI-assisted Chrome extension for the Wayback Machine using Chrome Prompt API and on-device Gemini Nano.",
      technologies: ["genAI", "Chrome Extension", "JavaScript", "Open Source"],
      achievements: [],
    },
    {
      title: "Software Engineer & Instructor",
      icon: Globe,
      company: "AlgoUniversity",
      duration: "4 Weeks",
      description:
        "Started as a Problem Setting Intern before being promoted to Software Engineer & Instructor, where I now build AI-powered learning experiences and contribute to the AlgoQuest LMS platform.",
      technologies: ["React", "Django", "TypeScript", "PostgreSQL", "AI"],
      achievements: [
        "Rapidly engineered and delivered a functional Online Judge platform, meeting aggressive deadlines through intense development cycles.",
        "Architected comprehensive unit, integration, and component testing suites, alongside the deployment of automated CI/CD pipelines to streamline pull request workflows.",
        "Mentored four student teams, guiding them to build the same online judge project with a scalable architecture."
      ],
    },
    {
      title: "Full Stack Developer",
      icon: Globe,
      company: "The Right Doctors",
      duration: "June 2025 - July 2025",
      description:
        "Optimized APIs, fixed bugs, and built CRUD features across the stack.",
      technologies: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB"],
      achievements: [
        "Optimized API calls across multiple Angular components",
        "Resolved critical frontend and backend bugs",
        "Built full-stack CRUD modules",
        "Implemented real-time form validation",
      ],
    },
    {
      title: "Content Developer",
      icon: Terminal,
      company: "Eklavya.Me",
      duration: "May 2024 - Jan 2025",
      description:
        "Created educational content on programming, DSA, and career guidance.",
      technologies: ["DSA", "Algorithms", "C++", "JavaScript"],
      achievements: [
        "Created engaging educational video content",
        "Improved exam readiness with visual explanations",
        "Consistent on-schedule delivery",
      ],
    },
  ];

  const projects = [
    {
      title: "Online Judge",
      description:
        "A full-stack coding platform that securely executes code in Docker containers, evaluates submissions against test cases, and provides real-time verdicts.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "Docker",
        "PostgreSQL",
        "Redis",
      ],
      github: "https://github.com/sdass1918/Online-Judge",
      live: "",
    },
    {
      title: "ChatAI",
      description:
        "Unifies GPT-4o, Deepseek, Gemini with conversation management, streaming, and OTP security.",
      technologies: [
        "React.js",
        "Express.js",
        "Node.js",
        "Prisma",
        "PostgreSQL",
        "JWT",
      ],
      github: "https://github.com/sdass1918/ChatAI-Project",
      live: "https://project-chatai.vercel.app/",
    },
    {
      title: "Adept Chrome Extension",
      description:
        "Privacy-first extension using Chrome's Summarizer, Rewriter, Translator APIs for on-device text processing.",
      technologies: ["Chrome Extensions", "JavaScript", "Chrome AI"],
      github: "https://github.com/sdass1918/on-device-ai-extension",
      live: "https://youtu.be/1FKCLkK719o",
    },
    {
      title: "AI Claim Verifier",
      description:
        "Agentic AI using Tavily Search for real-time fact-checking with autonomous evidence gathering.",
      technologies: ["Express.js", "React", "Gemini API", "Tavily"],
      github: "https://github.com/sdass1918/Claim-Verifier-AI-Agent",
      live: "https://claim-verifier-ai-agent-wcir.vercel.app/",
    },
    {
      title: "Nirvaan Website Builder",
      description:
        "AI website builder generating functional sites from natural language using WebContainers.",
      technologies: ["React", "Express", "WebContainers", "Gemini API"],
      github: "https://github.com/sdass1918/Nirvaan-An-AI-website-builder",
      live: "https://nirvaan-an-ai-website-builder.vercel.app/",
    },
    {
      title: "Insurance Claim System",
      description:
        "MERN RAG app automating claim approvals with LangChain, Gemini, and Pinecone.",
      technologies: ["Express.js", "LangChain", "Gemini", "Pinecone"],
      github: "https://github.com/sdass1918/bajajHackrx",
      live: "https://bajajhackrx-0i4v.onrender.com",
    },
    {
      title: "Transcript Summarizer",
      description:
        "LLM-powered summarization for conversations and lectures with email delivery via Nodemailer.",
      technologies: ["Express.js", "Groq", "NLP", "Nodemailer"],
      github: "https://github.com/sdass1918/AI-Summarizer",
      live: "https://ai-summarizer-frontend-shtm.vercel.app/",
    },
    {
      title: "Finance Visualizer",
      description:
        "Full-stack finance tracker with expense management and Recharts visualizations.",
      technologies: ["Next.js", "React", "Recharts", "MongoDB"],
      github: "https://github.com/sdass1918/Financial-Manager",
      live: "https://financial-manager-k3b8.vercel.app/",
    },
    {
      title: "Quizzite Quiz Builder",
      description:
        "Quiz generator with auto Google Forms creation via Apps Script and Appwrite auth.",
      technologies: ["React", "Tailwind CSS", "Appwrite", "Google Apps Script"],
      github: "https://github.com/sdass1918/Musicx",
      live: "https://quizzite-wxuu.onrender.com/",
    },
  ];

  const blogs = [
    {
      title:
        "I Thought Gemini Was Hallucinating. It Was Actually Remembering Everything.",
      desc: "How a Chrome extension, an on-device LLM, and one innocent design decision led to one of the most interesting debugging sessions I’ve had.",
      date: "June 2026",
      link: "https://medium.com/@sd1216826/i-thought-gemini-was-hallucinating-it-was-actually-remembering-everything-af5aabee89cf?sharedUserId=sd1216826",
      tags: ["Debugging", "Google Summer of Code", "Artificial Intelligence", "Javascript"]
    },
    {
      title: "GSoC 2026: From Almost Giving Up to Getting Selected",
      desc: "I got into GSoC 2026. And honestly, I still can’t believe it.",
      date: "June 2026",
      link: "https://medium.com/@sd1216826/gsoc-2026-from-almost-giving-up-to-getting-selected-3791ab6ea587",
      tags: ["GSoC", "Open Source"],
    },
  ];

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: mouse.x,
          top: mouse.y,
          transition: "left 0.06s, top 0.06s",
        }}
      />
      <div
        className="cursor-ring"
        id="cursor-ring"
        style={{
          left: mouse.x,
          top: mouse.y,
          transition:
            "left 0.12s, top 0.12s, width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 mac-nav transition-all ${scrollY > 50 ? "shadow-lg shadow-black/20" : ""}`}
      >
        <div className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 text-sm text-primary"
          >
            <span className="text-secondary">$</span>
            <span className="font-semibold">sdass</span>
            <span className="animate-pulse text-secondary">_</span>
          </button>
          <div className="hidden md:flex items-center gap-0.5">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                  activeNav === item.id
                    ? "text-primary bg-white/5"
                    : "text-tertiary hover:text-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://drive.google.com/drive/folders/1rghJO4_FtQlrDMr4p4H9f8XxJY8GnDBN?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-2.5 py-1.5 text-[11px] font-medium border border-border-primary text-secondary hover:text-primary hover:border-secondary transition-all flex items-center gap-1"
            >
              resume <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-tertiary hover:text-primary"
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span
                className={`block h-[1px] w-full bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`}
              />
              <span
                className={`block h-[1px] w-full bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1px] w-full bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
              />
            </div>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border-primary mac-nav">
            <div className="px-4 py-2 space-y-0.5">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-2.5 py-2 text-xs transition-all ${
                    activeNav === item.id
                      ? "text-primary bg-white/5"
                      : "text-tertiary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="bg-primary text-primary min-h-screen relative overflow-x-hidden font-mono">
        {/* Grid */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Hero */}
        {/* Hero */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
          {/* Banner with Seamless Fade Transition */}
          <div className="banner">
            <div className="banner-grid" />
            <img
              src="CoverImage2.jpeg"
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
            />
            {/* The fix: A gradient that goes from transparent to exact bg-primary */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)",
              }}
            />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10 pt-20">
            <div className="animate-fade-up">
              <button
                onClick={() => setShowPhoto(true)}
                className="relative group flex-shrink-0 mx-auto mb-8"
              >
                <div className="w-24 h-24 rounded-sm overflow-hidden border border-border-primary bg-tertiary mx-auto">
                  <img
                    src="photo.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500"
                  />
                </div>
              </button>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight glitter-text mb-2">
                {typedChars}
                {typedChars.length < titleText.length && (
                  <span className="typing-cursor" />
                )}
              </h1>
              <span className="text-xs text-tertiary mb-6 block">21</span>

              <div className="text-xs text-tertiary max-w-xl mx-auto mb-8 leading-relaxed px-4 flex flex-col gap-1.5 text-left md:text-center">
                <div className="flex items-center md:justify-center gap-2 mb-1">
                  <span className="text-secondary">&gt;</span>
                  <span className="font-extrabold text-primary font-mono tracking-wider uppercase text-[10px]">
                    Engineer &middot; Open Source &middot; AI
                  </span>
                </div>
                <p className="font-extrabold text-white">
                  I build full-stack applications, developer tools, and AI
                  products.
                </p>
                <p className="opacity-80 font-extrabold text-white">
                  Currently contributing to{" "}
                  <span className="text-secondary">Google Summer of Code</span>{" "}
                  and building the next thing I'm curious about.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button
                  onClick={() => scrollTo("projects")}
                  className="bg-white/5 hover:bg-white/10 text-primary px-6 py-3 rounded-sm text-xs font-medium transition-all border border-border-primary hover:border-secondary flex items-center gap-2"
                >
                  View work
                </button>
                <a
                  href="https://drive.google.com/drive/folders/1rghJO4_FtQlrDMr4p4H9f8XxJY8GnDBN?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary px-6 py-3 rounded-sm text-xs font-medium transition-all border border-border-primary hover:border-secondary flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </a>
              </div>

              {/* Connect Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 animate-fade-up delay-5">
                <a
                  href="mailto:sudiptadofficial@gmail.com"
                  className="text-primary hover:bg-white/10 px-4 py-2 rounded-sm text-[11px] font-medium transition-all border border-border-primary hover:border-secondary flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email me
                </a>

                <div className="w-[1px] h-5 bg-border-primary hidden sm:block"></div>

                <div className="flex gap-5">
                  {[
                    { icon: Twitter, href: "https://x.com/Sudipta1918" },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/sudipta-das19/",
                    },
                    { icon: Github, href: "https://github.com/sdass1918" },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-primary transition-all hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 animate-fade-up delay-7">
              <button
                onClick={() => scrollTo("github-stats")}
                className="text-tertiary hover:text-primary transition-all animate-bounce"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* GitHub Stats & Contributions */}
        <section id="github-stats" className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* GitHub Activity Graph Area */}
            <div className="mb-12 border-b border-dashed border-border-primary/50 pb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                  GitHub Activity
                </h2>
                <span className="text-tertiary text-[11px]">
                  Recent GitHub activities
                </span>
              </div>

              <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
                <div className="min-w-[750px]">
                  <img
                    src="https://ghchart.rshah.org/sdass1918"
                    alt="GitHub Contributions"
                    className="w-full opacity-90 mix-blend-screen"
                    style={{
                      /* Grayscale first, invert for dark mode, then gentle adjustments so we don't crush the mid-tones */
                      filter:
                        "grayscale(100%) invert(1) brightness(1.8) contrast(1.2)",
                    }}
                  />
                  <div className="flex justify-end items-center mt-4 text-[10px] text-tertiary gap-2">
                    <span>Less active</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-white/5"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/20"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/40"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/60"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/90"></div>
                    </div>
                    <span>More active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Source Contributions List */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-xl font-bold text-primary tracking-tight">
                  Open Source Contributions
                </h2>
                <div className="flex items-center rounded-md border border-border-primary bg-[#0d1117] overflow-hidden p-0.5">
                  {(["merged", "open", "closed"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setPrFilter(f);
                        setPrShowAll(false);
                      }}
                      className={`px-4 py-1.5 text-xs font-medium transition-all ${
                        prFilter === f
                          ? "bg-[#21262d] text-primary rounded-md border border-border-primary"
                          : "text-tertiary hover:text-secondary"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {(() => {
                  const filtered = contributions.filter((pr) => {
                    if (prFilter === "merged") return pr.merged;
                    if (prFilter === "open") return pr.state === "open";
                    return pr.state === "closed" && !pr.merged;
                  });
                  const visible = prShowAll ? filtered : filtered.slice(0, 5);

                  if (contributions.length === 0)
                    return (
                      <div className="text-xs text-tertiary font-mono animate-pulse">
                        &gt; Fetching real contributions from GitHub API...
                      </div>
                    );

                  if (filtered.length === 0)
                    return (
                      <div className="text-xs text-tertiary">
                        &gt; No {prFilter} contributions found.
                      </div>
                    );

                  return (
                    <>
                      {visible.map(
                        (
                          pr: {
                            id: number;
                            title: string;
                            repo: string;
                            url: string;
                            number: number;
                            state: string;
                            merged: boolean;
                          },
                          index: number,
                        ) => (
                          <div
                            key={pr.id}
                            className={`flex items-start gap-3 group ${index !== 0 ? "border-t border-dashed border-border-primary/30 pt-6" : ""}`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                                pr.merged
                                  ? "bg-[#3fb950] shadow-[0_0_8px_rgba(63,185,80,0.5)]"
                                  : pr.state === "open"
                                    ? "bg-[#d29922] shadow-[0_0_8px_rgba(210,153,34,0.5)]"
                                    : "bg-[#f85149] shadow-[0_0_8px_rgba(248,81,73,0.5)]"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <a
                                href={pr.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <h3 className="text-[13px] font-medium text-primary mb-1 hover:text-[#58a6ff] transition-colors cursor-pointer truncate">
                                  {pr.title}{" "}
                                  <span className="text-tertiary font-normal">
                                    #{pr.number}
                                  </span>
                                </h3>
                              </a>
                              <p className="text-[11px] text-tertiary truncate">
                                {pr.repo}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                      {filtered.length > 5 && !prShowAll && (
                        <button
                          onClick={() => setPrShowAll(true)}
                          className="w-full py-3 text-xs text-tertiary hover:text-primary transition-colors border-t border-dashed border-border-primary/30 mt-2"
                        >
                          + see all {filtered.length} contributions
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <span className="section-label">
                <Terminal className="w-3 h-3" /> career
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-primary">
                $ experience
              </h2>
              <div className="code-divider">
                <span>// professional journey</span>
              </div>
            </div>
            <div className="space-y-3">
              {experiences.map((exp, i) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedExp(exp)}
                    className="mac-card p-4 cursor-pointer animate-fade-up group"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-tertiary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-tertiary mb-0.5">
                          {exp.duration}
                        </div>
                        <h3 className="text-sm font-semibold text-primary">
                          {exp.title}
                        </h3>
                        <p className="text-xs text-tertiary mb-2">
                          {exp.company}
                        </p>
                        <p className="text-[11px] text-secondary leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.technologies.map((t, j) => (
                            <span key={j} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Modal */}
        {selectedExp.title && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-blur-in">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() =>
                setSelectedExp({
                  title: "",
                  company: "",
                  duration: "",
                  description: "",
                  technologies: [],
                  achievements: [],
                })
              }
            />
            <div className="mac-window w-full max-w-md relative animate-mac-spring">
              <div className="mac-titlebar">
                <div
                  className="mac-dot red"
                  onClick={() =>
                    setSelectedExp({
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
                <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-tertiary truncate max-w-[60%]">
                  {selectedExp.title}
                </span>
              </div>
              <div className="p-5 max-h-[65vh] overflow-y-auto">
                <h3 className="text-sm font-semibold text-primary mb-0.5">
                  {selectedExp.title}
                </h3>
                <p className="text-xs text-tertiary mb-3">
                  {selectedExp.company} &middot; {selectedExp.duration}
                </p>
                <p className="text-[11px] text-secondary leading-relaxed mb-4">
                  {selectedExp.description}
                </p>
                {selectedExp.achievements?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[10px] text-tertiary uppercase tracking-wider mb-2">
                      achievements
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedExp.achievements.map((a, j) => (
                        <li
                          key={j}
                          className="text-[11px] text-secondary flex gap-2"
                        >
                          <span className="text-tertiary whitespace-nowrap">
                            -&gt;
                          </span>{" "}
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-primary">
                  {selectedExp.technologies?.map((t, j) => (
                    <span key={j} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {showPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-blur-in">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowPhoto(false)}
            />
            <div className="mac-window w-auto relative animate-mac-spring max-w-[90vw] max-h-[90vh]">
              <div className="mac-titlebar">
                <div
                  className="mac-dot red"
                  onClick={() => setShowPhoto(false)}
                />
                <div className="mac-dot yellow" />
                <div className="mac-dot green" />
                <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-tertiary">
                  photo.jpeg
                </span>
              </div>
              <div className="p-1">
                <img
                  src="photo.jpeg"
                  alt="Profile"
                  className="max-w-full max-h-[70vh] rounded-b-lg object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <span className="section-label">
                <Code className="w-3 h-3" /> expertise
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-primary">
                $ skills
              </h2>
              <div className="code-divider">
                <span>// tools & technologies</span>
              </div>
            </div>

            {/* Grid container with 4 columns on medium/large screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up">
              {technicalSkills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={i}
                    // Replaced the custom bg/border with 'mac-card' for the matte black look
                    className="mac-card flex items-center gap-2.5 px-4 py-3 rounded-md transition-all cursor-default group animate-fade-up"
                    style={{ animationDelay: `${i * 0.02}s` }}
                  >
                    <Icon className="w-4 h-4 text-tertiary group-hover:text-secondary transition-colors" />
                    <span className="text-[13px] text-secondary group-hover:text-primary transition-colors font-medium truncate">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <span className="section-label">
                <Terminal className="w-3 h-3" /> work
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-primary">
                $ projects
              </h2>
              <div className="code-divider">
                <span>// things i've built</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {projects.map((proj, i) => {
                const open = expandedProj === i;
                return (
                  <div
                    key={i}
                    className="mac-card p-3.5 animate-fade-up flex flex-col group"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-xs font-semibold text-primary">
                        {proj.title}
                      </h3>
                      <span className="text-tertiary text-[9px]">
                        // {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] text-secondary leading-relaxed mb-2.5 ${open ? "" : "line-clamp-3"}`}
                    >
                      {proj.description}
                    </p>
                    <button
                      onClick={() => setExpandedProj(open ? null : i)}
                      className="text-[10px] text-tertiary hover:text-primary transition-colors mb-2.5 self-start"
                    >
                      {open ? "$ show_less" : "$ read_more"}
                    </button>
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {proj.technologies.map((t, j) => (
                        <span key={j} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto pt-2.5 border-t border-border-primary/50">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary transition-colors p-1 rounded hover:bg-white/5"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary transition-colors p-1 rounded hover:bg-white/5"
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

        {/* Blogs */}
        <section id="blogs" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <span className="section-label">
                <FileText className="w-3 h-3" /> writing
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3 text-primary">
                $ blogs
              </h2>
              <div className="code-divider">
                <span>// thoughts on engineering</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {blogs.map((b, i) => (
                <a
                  key={i}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mac-card p-3.5 flex items-start gap-3 animate-fade-up group block"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-tertiary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-tertiary mb-0.5">
                      {b.date}
                    </div>
                    <h3 className="text-xs font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-[11px] text-secondary leading-relaxed line-clamp-2">
                      {b.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {b.tags.map((t, j) => (
                        <span key={j} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 border-t border-border-primary">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-tertiary text-[11px]">$</span>
              <p className="text-[11px] text-tertiary">&copy; 2025 sdass</p>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Mail, href: "mailto:sudiptadofficial@gmail.com" },
                { icon: Phone, href: "tel:9905612470" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sudipta-das19/",
                },
                { icon: Github, href: "https://github.com/sdass1918" },
                { icon: Twitter, href: "https://x.com/Sudipta1918" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};;

export default App;
