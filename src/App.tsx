import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  Camera,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  Star,
  Award,
  Users,
  Calendar,
  Twitter,
  SunMedium as Medium,
  CodeSquare,
} from "lucide-react";

const App = () => {
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

  useEffect(() => {
    if (selectedExperience.title) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        setSelectedExperience({
          title: "",
          company: "",
          duration: "",
          description: "",
          technologies: [],
          achievements: [],
        });
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
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-transparent border-t-accent-blue border-r-accent-purple rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-accent-pink border-l-accent-cyan rounded-full animate-spin-reverse mx-auto"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gradient animate-pulse">
              Loading Portfolio
            </h2>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
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
  };

  const skills = [
    {
      name: "Frontend Development",
      level: 95,
      icon: <Code />,
      color: "from-accent-cyan to-accent-blue",
      proofOfWork:
        "Built dynamic UIs including a full dashboard and AI-powered website builder.",
    },
    {
      name: "Backend Development",
      level: 88,
      icon: <Database className="w-6 h-6" />,
      color: "from-accent-purple to-accent-pink",
      proofOfWork:
        "Created REST APIs and backend logic for CRUD systems and financial tools.",
    },
    {
      name: "UI/UX Design",
      level: 82,
      icon: <Palette className="w-6 h-6" />,
      color: "from-accent-green to-accent-emerald",
      proofOfWork:
        "Designed responsive, modern UIs with custom animations and gradients.",
    },
    {
      name: "Full Stack Development",
      level: 90,
      icon: <Globe className="w-6 h-6" />,
      color: "from-accent-orange to-accent-red",
      proofOfWork:
        "Developed complete CRUD systems with authentication, real-time UI updates, and clean REST API integrations across multiple projects. Used database for storing structured data in real-world projects like admin panels.",
    },
    {
      name: "Data Structures & Algorithms",
      icon: <CodeSquare />, // You can use something like <FaCode /> or <SiLeetcode />
      color: "from-yellow-400 to-orange-500",
      proofOfWork:
        "Solved 300+ problems on platforms like LeetCode and codechef. Applied DSA in real-world apps like quiz generators and optimised data flows in full-stack projects.",
    },
  ];

  const experiences = [
    {
      title: "Full Stack Developer",
      icon: Globe,
      company: "The Right Doctors",
      duration: "June 2025 - July 2025",
      description:
        "Full Stack Developer Intern at The Right Doctors, where I optimized APIs, fixed key bugs, and built robust CRUD features across the stack.",
      technologies: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB"],
      achievements: [
        "Optimized API calls across multiple Angular components, reducing redundant requests and improving dashboard performance.",
        "Resolved critical frontend and backend bugs, enhancing the reliability and user experience of the admin panel.",
        "Built a full-stack CRUD module for dynamic data (categories, events, etc.) using Angular, Node.js, and MongoDB.",
        "Implemented clean UI components with real-time form validation and integrated them with secure backend APIs.",
      ],
    },
    {
      title: "Content Developer",
      icon: Camera,
      company: "Eklavya.Me",
      duration: "May 2024 - Jan 2025",
      description:
        "Demonstrated reliability and time management by contributing to an ed-tech platform, creating educational videos on programming, data structures, and career guidance. Leveraged creative problem-solving and a cooperative approach to enhance student learning outcomes and exam awareness.",
      technologies: ["Data structures", "Algorithms", "C++", "JavaScript"],
      achievements: [
        "Created engaging educational video content covering programming fundamentals, data structures, and career guidance for students.",
        "Improved student exam readiness by breaking down complex topics into easy-to-understand visual explanations.",
        "Demonstrated consistency and time management by delivering high-quality content on schedule.",
        "Collaborated effectively with the content and technical teams to ensure alignment with curriculum goals and learner needs.",
      ],
    },
    {
      title: "Technical Team Coordinator",
      icon: Users,
      company: "GeeksForGeeks Student Chapter RGIPT",
      duration: "May 2024 - Present",
      description:
        "As a Technical Team Coordinator, I am responsible for managing a team of developers to deliver projects on time and within scope. I use Agile methodologies to improve team collaboration and productivity, and facilitate communication between technical and non-technical stakeholders to ensure alignment on project goals.",
      technologies: [
        "Project Management",
        "Team Coordination",
        "Agile Methodologies",
        "Communication",
      ],
      achievements: [
        "Conducted technical events and workshops to enhance the technical skills of students in our college.",
        "Successfully managed a team of developers and content creators to deliver projects on time and within scope.",
        "Conducted coding contests and technical quizzes to foster a competitive learning environment in college.",
        "Facilitated communication between technical and non-technical stakeholders to ensure alignment on project goals.",
      ],
    },
  ];

  const projects = [
    {
      title: "Nirvaan - An AI website builder",
      description:
        "Built an AI-powered full-stack website builder that lets users generate and preview fully functional websites from natural language prompts. Leveraged WebContainers for in-browser code execution and enabledreal-time previews with dynamic file mounting and live npm installs.",
      image: "Nirvaan.png",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "WebContainers",
        "Gemini API",
      ],
      github: "https://github.com/sdass1918/Nirvaan---An-AI-website-builder",
      live: "https://nirvaan-an-ai-website-builder.vercel.app/",
      featured: false,
    },
    {
      title: "Personal Finance Visualizer",
      description:
        "Developed a full-stack finance tracker with categorized expense management, budget monitoring, and data visualization using Next.js, React, shadcn/ui, and Recharts, enabling users to track spending patterns and budget performance.",
      image: "PersonalFinanceVisualizer.png",
      technologies: ["Next.js", "React", "shadcn/ui", "Recharts", "MongoDB"],
      github: "https://github.com/sdass1918/Financial-Manager",
      live: "https://financial-manager-k3b8.vercel.app/",
      featured: false,
    },
    {
      title: "Quizzite - Quiz Builder",
      description:
        "Built a full-stack quiz app allowing users to generate topic-based quizzes and auto-create shareable Google Forms. Implemented secure user auth with Appwrite, dynamic quiz fetching using Open Trivia DB, and automated Google Form generation using Apps Script via a Node.js proxy.",
      image: "Quizzite.png",
      technologies: [
        "React",
        "Node.js",
        "Tailwind CSS",
        "Appwrite",
        "Google Apps Script",
      ],
      github: "https://github.com/sdass1918/Musicx",
      live: "https://quizzite-wxuu.onrender.com/",
      featured: false,
    },
  ];

  // const stats = [
  //   {
  //     icon: <Code className="w-8 h-8" />,
  //     value: "50+",
  //     label: "Projects Completed",
  //   },
  //   {
  //     icon: <Users className="w-8 h-8" />,
  //     value: "25+",
  //     label: "Happy Clients",
  //   },
  //   {
  //     icon: <Award className="w-8 h-8" />,
  //     value: "5+",
  //     label: "Years Experience",
  //   },
  //   { icon: <Star className="w-8 h-8" />, value: "15+", label: "Awards Won" },
  // ];

  return (
    <>
      {/* Mouse Effect */}
      <div
        className="fixed pointer-events-none w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl z-[1]"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: "all 0.3s ease-out",
        }}
      ></div>

      {/* Main Content */}
      <div className="bg-dark-primary text-text-primary min-h-screen relative overflow-x-hidden">
        {/* Grid Background */}
        <div className="fixed inset-0 grid-background pointer-events-none"></div>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 relative"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-8 animate-fade-in-up">
              {/* Profile Image */}
              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-border-primary bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center animate-fade-in-up">
                  <img
                    src="photo1extra.jpg"
                    alt="Profile Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-text-primary">
                  Hi, I'm Sudipta
                </h1>
                <p className="text-lg text-text-secondary mb-6">
                  20, India | Full Stack Engineer
                </p>
              </div>

              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                I'm a Full Stack Developer crafting cutting-edge applications
                and digital solutions. From writing secure code to building
                intuitive interfaces, I turn complex concepts into user-friendly
                experiences.
              </p>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up animation-delay-400">
                <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
                <span className="text-text-secondary text-sm">
                  Available for work
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
              <button
                onClick={() => scrollToSection("projects")}
                className="group bg-gradient-to-r from-accent-cyan to-accent-purple hover:from-accent-cyan/80 hover:to-accent-purple/80 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-purple/25 relative overflow-hidden"
              >
                <span className="relative z-10 text-dark-primary">
                  View My Work
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <a
                href="https://drive.google.com/file/d/1Z23wvciQ_2UtvzTsaQ7DCtZ8XLAKkwtM/view?usp=sharing"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group border-2 border-border-primary hover:border-accent-cyan px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-accent-cyan/10 flex items-center gap-3 text-text-primary">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-8 animate-fade-in-up animation-delay-800">
              {[
                {
                  icon: Twitter,
                  href: "https://x.com/Sudipta1918",
                  color: "hover:text-accent-cyan",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sudipta-das19/",
                  color: "hover:text-accent-blue",
                },
                {
                  icon: Github,
                  href: "https://github.com/sdass1918",
                  color: "hover:text-accent-purple",
                },
              ].map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`text-text-secondary ${color} transition-all duration-300 hover:scale-125 transform`}
                >
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up animation-delay-1000">
              <button
                onClick={() => scrollToSection("experience")}
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 animate-bounce-slow"
              >
                <ChevronDown className="w-8 h-8" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-20 px-4 bg-dark-secondary/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-accent-cyan mb-4 flex justify-center group-hover:animate-pulse">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2 animate-count-up">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

        {/* About Section */}
        {/* <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-6 text-gradient">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h3 className="text-3xl font-semibold mb-6 text-accent-cyan">
                Hello! I'm Sudipta Das
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed text-lg">
                I'm a passionate Full Stack Developer with over 5 years of
                experience creating exceptional digital experiences. I
                specialize in modern web technologies and have a keen eye for
                design, allowing me to bridge the gap between technical
                implementation and user experience.
              </p>
              <p className="text-text-secondary mb-8 leading-relaxed text-lg">
                My journey in tech started with a curiosity about how things
                work, which led me to pursue computer science and eventually
                specializing in web development. I'm constantly learning new
                technologies and best practices to stay at the forefront of the
                industry.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-cyan group-hover:animate-pulse" />
                    Location
                  </h4>
                  <p className="text-text-secondary">San Francisco, CA</p>
                </div>
                <div className="group">
                  <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-accent-purple group-hover:animate-pulse" />
                    Email
                  </h4>
                  <p className="text-text-secondary">john.doe@email.com</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="w-full h-96 bg-gradient-to-br from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 rounded-2xl flex items-center justify-center border border-border-primary backdrop-blur-sm relative overflow-hidden group">
                <div className="text-center z-10">
                  <img src="photo4.jpg" alt="Profile photo" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl font-bold mb-6 text-gradient">
                Experience
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mb-6"></div>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Here's a timeline of my professional journey, showcasing my
                roles and contributions in full-stack development.
              </p>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedExperience(exp)}
                    className="bg-dark-tertiary/50 p-8 rounded-2xl border border-border-primary hover:border-border-secondary transition-all duration-300 backdrop-blur-sm group hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-dark-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-accent-cyan" />
                          <p className="text-sm text-text-secondary">
                            {exp.duration}
                          </p>
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary mb-2">
                          {exp.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-accent-blue mb-4">
                          {exp.company}
                        </h4>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 text-accent-cyan rounded-full text-sm border border-accent-cyan/30 hover:scale-105 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {selectedExperience.title && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 transition-opacity animate-fade-in">
                  <div className="bg-dark-primary max-w-lg w-full mx-4 sm:mx-0 rounded-2xl p-6 relative border border-border-primary shadow-xl transform scale-95 animate-scale-in">
                    {/* Close Button */}
                    <button
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
                      className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition"
                    >
                      ✕
                    </button>

                    {/* Title & Company */}
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {selectedExperience.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-accent-blue mb-4">
                      {selectedExperience.company}
                    </h4>

                    {/* Duration */}
                    <p className="text-sm text-text-secondary mb-4">
                      {selectedExperience.duration}
                    </p>

                    {/* Description */}
                    <p className="text-text-secondary mb-6">
                      {selectedExperience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-text-primary mb-2">
                        Key Achievements:
                      </h5>
                      <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                        {selectedExperience.achievements?.map((item, i) => (
                          <li key={i}>
                            {item}
                            <br />
                            <br />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedExperience.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 text-accent-cyan rounded-full text-sm border border-accent-cyan/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl font-bold mb-6 text-gradient">
                Skills & Expertise
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto"></div>
            </div>

            <div className="bg-dark-tertiary/50 p-8 rounded-2xl border border-border-primary hover:border-border-secondary transition-all duration-300 backdrop-blur-sm animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-start gap-4">
                    <div className={`text-2xl text-white`}>{skill.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-text-secondary">
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
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl font-bold mb-6 pb-1 text-gradient">
                Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-dark-secondary border border-border-primary rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-semibold text-accent-cyan mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-text-secondary mb-4 leading-snug line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-0.5 bg-white/10 text-white rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl font-bold mb-6 text-gradient">
                Get In Touch
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mb-6"></div>
              <p className="text-xl text-text-secondary">
                Let's work together to bring your ideas to life
              </p>
            </div>

            <div className="bg-dark-tertiary/50 p-8 rounded-2xl border border-border-primary backdrop-blur-sm animate-fade-in-up">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-border-primary rounded-lg focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-200 group-hover:border-border-secondary text-text-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-border-primary rounded-lg focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-200 group-hover:border-border-secondary text-text-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-border-primary rounded-lg focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-200 group-hover:border-border-secondary text-text-primary"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-border-primary rounded-lg focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-200 resize-none group-hover:border-border-secondary text-text-primary"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple hover:from-accent-cyan/80 hover:to-accent-purple/80 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-purple/25 relative overflow-hidden group"
                >
                  <span className="relative z-10 text-dark-primary">
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </section> */}

        {/* Footer */}
        <footer
          id="footer"
          className="py-8 px-4 border-t border-border-primary bg-dark-primary/50 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center gap-6 md:gap-0">
            <p className="text-text-secondary">
              © 2025 Sudipta Das. Built with ♥️ by me for you!
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <a
                href="mailto:sudiptadofficial@gmail.com"
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 hover:scale-125 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:9905612470"
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 hover:scale-125 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/sudipta-das19/"
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 hover:scale-125 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/sdass1918"
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 hover:scale-125 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://x.com/Sudipta1918"
                className="text-text-secondary hover:text-accent-cyan transition-all duration-300 hover:scale-125 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
