
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  ExternalLink, 
  Download,
  Menu,
  X,
  Cpu,
  Trophy,
  Mic,
  Users,
  GraduationCap,
  Briefcase,
  Code,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Database,
  Globe,
  Sun,
  Monitor,
  Moon
} from 'lucide-react';
import { 
  SKILLS, 
  EXPERIENCES, 
  EDUCATION_DATA, 
  ACHIEVEMENTS, 
  TALKS, 
  LEADERSHIP, 
  CATEGORY_ICONS,
  PROJECTS
} from './constants';
import portfolioPic from './portfolio-pic.JPG';
import cvPdf from "./Chukwuemeka's CV (2).pdf";

// Component to handle smooth reveal animations as sections enter the viewport
const SectionWrapper = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] scroll-mt-24 ${className} ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.97] pointer-events-none'
      }`}
    >
      {children}
    </section>
  );
};

type ThemeMode = 'system' | 'light' | 'dark';

const Header = ({
  themeMode,
  setThemeMode
}: {
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Awards', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 md:bg-dark/90 md:backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(39,128,226,0.6)] transition-all">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="hidden sm:block font-bold text-lg tracking-wider uppercase text-white/90 group-hover:text-white transition-colors">Olaraonye</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-[10px] font-black transition-all uppercase tracking-[0.2em] py-2 group/link ${
                activeSection === link.href.substring(1) ? 'text-brand' : 'text-gray-400 hover:text-brand'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover/link:w-1/2'}`} />
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2.5 bg-brand text-white rounded-full text-xs font-bold hover:shadow-[0_0_25px_rgba(39,128,226,0.4)] transition-all active:scale-95 flex items-center gap-2 group/btn"
          >
            LET'S TALK <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="hidden md:flex items-center p-1 rounded-full bg-surface border border-white/10 ml-6">
          <button
            onClick={() => setThemeMode('system')}
            aria-label="Use system theme"
            className={`p-2 rounded-full transition-colors ${themeMode === 'system' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setThemeMode('light')}
            aria-label="Use light theme"
            className={`p-2 rounded-full transition-colors ${themeMode === 'light' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Sun size={14} />
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            aria-label="Use dark theme"
            className={`p-2 rounded-full transition-colors ${themeMode === 'dark' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Moon size={14} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 relative z-50 transition-transform active:scale-90">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-dark/98 backdrop-blur-2xl z-40 transition-all duration-500 md:hidden flex items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center p-1 rounded-full bg-surface border border-white/10">
            <button
              onClick={() => setThemeMode('system')}
              aria-label="Use system theme"
              className={`p-3 rounded-full transition-colors ${themeMode === 'system' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setThemeMode('light')}
              aria-label="Use light theme"
              className={`p-3 rounded-full transition-colors ${themeMode === 'light' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Sun size={18} />
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              aria-label="Use dark theme"
              className={`p-3 rounded-full transition-colors ${themeMode === 'dark' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Moon size={18} />
            </button>
          </div>
          {navLinks.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-3xl font-black uppercase tracking-tighter transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${activeSection === link.href.substring(1) ? 'text-brand' : 'text-white hover:text-brand'}`}
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="mailto:olaraonyemeka@gmail.com" 
            className={`mt-8 px-10 py-4 border-2 border-brand text-brand font-bold rounded-full uppercase tracking-widest hover:bg-brand hover:text-white transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${navLinks.length * 75}ms` }}
          >
            Email Me
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Aspiring Tech Founder & AI-Driven Computer Scientist";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 glow-mesh" />
      <div className="scanline"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
        <div className="z-10 text-center md:text-left animate-[fadeIn_1s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-[10px] font-black mb-8 tracking-[0.2em] uppercase animate-pulse shadow-[0_0_15px_rgba(39,128,226,0.1)]">
            <Cpu size={14} /> Systems Intelligence Researcher
          </div>
          <h1 className="text-4xl lg:text-7xl font-black leading-none mb-8 tracking-tighter text-white">
            {text}
            <span className="inline-block w-1.5 h-10 md:h-16 bg-brand ml-2 animate-pulse align-middle" />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light italic">
            "Leveraging Artificial Intelligence to architect scalable solutions for the next generation of global industry."
          </p>
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-brand text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(39,128,226,0.5)] transition-all flex items-center gap-2 group"
            >
              View Innovations <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={cvPdf}
              download="Chukwuemeka_Olaraonye_CV.pdf"
              className="px-10 py-4 border border-white/10 hover:border-brand/50 bg-white/5 hover:bg-brand/10 rounded-xl transition-all flex items-center gap-2 group text-white/80 hover:text-white"
            >
              Download CV <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="relative hidden md:flex justify-center items-center animate-[fadeInRight_1.5s_ease-out_forwards]">
            <div className="relative w-[450px] h-[450px]">
                <div className="absolute inset-0 rounded-full bg-brand/10 blur-[120px] animate-pulse-slow" />
                <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-16 rounded-full border border-brand/20 border-dashed animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute inset-28 rounded-full border border-white/10 animate-[spin_40s_linear_infinite]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-56 h-56 bg-surface-accent border border-white/10 rounded-[2.5rem] flex items-center justify-center animate-float-ai shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                        <Cpu size={80} className="text-brand relative z-10 -rotate-[45deg]" />
                        <div className="absolute -bottom-2 -right-2 opacity-10">
                            <Code size={120} />
                        </div>
                    </div>
                </div>

                <div className="absolute top-10 right-10 w-12 h-12 bg-surface border border-white/10 rounded-xl flex items-center justify-center animate-bounce shadow-xl">
                  <Terminal size={20} className="text-brand" />
                </div>
                <div className="absolute bottom-12 left-8 w-14 h-14 bg-surface border border-white/10 rounded-2xl flex items-center justify-center animate-pulse delay-700 shadow-xl">
                  <Database size={24} className="text-brand" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-[2px] bg-brand" />
        <span className="text-brand font-black text-xs uppercase tracking-[0.3em]">Module</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-white">{title}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">{subtitle}</p>}
  </div>
);

const App = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const savedThemeMode = window.localStorage.getItem('theme-mode');
    if (savedThemeMode === 'system' || savedThemeMode === 'light' || savedThemeMode === 'dark') {
      setThemeMode(savedThemeMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    window.localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const senderEmail = formData.get('email');
    if (typeof senderEmail === 'string') {
      formData.append('_replyto', senderEmail);
    }
    formData.append('_subject', 'New Portfolio Contact Message');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/olaraonyemeka@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-dark text-white selection:bg-brand/30 selection:text-white relative">
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      
      <main className="relative z-10">
        <Hero />

        {/* About Me */}
        <SectionWrapper id="about" className="py-32 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group perspective-1000">
                <div className="absolute -inset-10 bg-brand/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:shadow-brand/20">
                    <img 
                      src={portfolioPic} 
                      alt="Chukwuemeka Olaraonye" 
                      className="w-full h-full object-cover contrast-110 brightness-90 group-hover:brightness-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-40"></div>
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark/60 backdrop-blur-md rounded-2xl border border-white/5 border-l-brand/50 border-l-4">
                      <p className="text-xs text-brand font-bold uppercase tracking-widest mb-1">Founder Intent</p>
                      <h4 className="text-lg font-bold">Innovation is a constant choice.</h4>
                    </div>
                </div>
            </div>
            <div>
              <SectionHeading title="System Bio" />
              <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-light">
                <p>
                  I am a driven and detail-oriented <span className="text-white font-semibold">MSc Computer Science student</span> with strong technical expertise in programming, web development, and problem-solving. My passion lies in creating efficient, <span className="text-white">high-quality solutions</span> and exploring the practical applications of Artificial Intelligence.
                </p>
                <p>
                  With a <span className="text-white font-semibold">BSc GPA of 4.42</span>, I combine theoretical depth with a commitment to continuous learning. I thrive in technology-focused environments where I can contribute to impactful, community-engaged innovations.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-brand/30 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    <div className="text-brand font-black text-4xl mb-1 tracking-tighter">4.42</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-500">Undergrad GPA</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-brand/30 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    <div className="text-brand font-black text-4xl mb-1 tracking-tighter">1st</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-500">FYP Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Skills Grid */}
        <SectionWrapper id="skills" className="py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading title="Neural Stack" subtitle="My multi-layered technical architecture for building modern intelligence." />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {['Programming', 'Frontend', 'Backend', 'DevOps & Cloud', 'Languages'].map((cat, idx) => (
                <div 
                  key={cat} 
                  className="p-8 rounded-[2rem] bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-brand/40 transition-all duration-500 group relative overflow-hidden"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="mb-8 p-4 bg-brand/10 w-fit rounded-2xl group-hover:bg-brand group-hover:text-white transition-all group-hover:scale-110 shadow-lg shadow-brand/5">
                    {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]}
                  </div>
                  <h3 className="font-black text-sm mb-6 text-white/90 uppercase tracking-[0.2em]">{cat}</h3>
                  <div className="space-y-3">
                    {SKILLS.filter(s => s.category === cat).map(skill => (
                      <div key={skill.name} className="text-gray-500 text-sm flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                        <div className="w-1.5 h-1.5 bg-brand/40 group-hover:bg-brand rounded-full shadow-[0_0_8px_rgba(39,128,226,0.3)]" /> 
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Projects Section */}
        <SectionWrapper id="projects" className="py-32 max-w-7xl mx-auto px-6">
          <SectionHeading title="Recent Outputs" subtitle="Selected technical projects demonstrating architecture and AI integration." />
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <div 
                key={i} 
                className="group relative rounded-3xl overflow-hidden border border-white/5 bg-surface-accent flex flex-col hover:border-brand/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="aspect-video bg-dark relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <Code size={120} />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-surface-accent to-transparent"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-brand/10 text-brand text-[9px] font-black uppercase tracking-widest rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white group-hover:text-brand transition-colors tracking-tight">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-8 font-light leading-relaxed flex-1">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand text-xs font-black uppercase tracking-widest hover:gap-4 transition-all group/link">
                    Explore Codebase <ExternalLink size={14} className="group-hover/link:opacity-100 opacity-50 transition-opacity" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Career Sequence */}
        <SectionWrapper id="experience" className="py-32 relative">
          <div className="absolute inset-0 bg-brand/[0.01] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-4 mb-16">
                <div className="p-3 bg-brand/10 rounded-xl text-brand">
                    <Briefcase size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Timeline: Professional</h2>
              </div>
              <div className="space-y-16">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative pl-12 border-l-2 border-white/5 group">
                    <div className="absolute top-0 left-[-11px] w-5 h-5 bg-dark border-4 border-brand rounded-full group-hover:scale-125 transition-transform" />
                    <div className="text-brand text-xs font-black tracking-[0.3em] uppercase mb-2">{exp.period}</div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-brand transition-colors">{exp.role}</h3>
                    <div className="text-gray-400 font-bold mb-6 text-sm flex items-center gap-2">
                        <Globe size={14} /> {exp.company}
                    </div>
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-500 text-sm leading-relaxed flex gap-3 group-hover:text-gray-400 transition-colors">
                          <span className="text-brand font-bold">//</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="lg:pt-0 pt-20">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-3 bg-brand/10 rounded-xl text-brand">
                    <GraduationCap size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Academic Records</h2>
              </div>
              <div className="space-y-10">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="p-10 rounded-3xl bg-surface border border-white/5 hover:bg-surface-accent transition-all duration-500 group relative">
                    <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-brand transition-all duration-500 rounded-l-3xl" />
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-white group-hover:text-brand transition-colors leading-tight mb-2 uppercase tracking-tight">{edu.degree}</h3>
                        <p className="text-gray-400 font-medium text-sm">{edu.institution}</p>
                      </div>
                      <span className="px-4 py-1.5 bg-white/5 text-gray-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10 group-hover:border-brand/30 group-hover:text-brand transition-all">{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <div className="inline-flex items-center gap-2 text-brand font-black text-lg mb-4 p-2 px-4 bg-brand/5 rounded-xl border border-brand/20">
                        <Trophy size={16} /> GPA: {edu.gpa}
                      </div>
                    )}
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Awards, Talks, Leadership Section */}
        <SectionWrapper id="achievements" className="py-32 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-12">
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="text-brand" size={28} />
                <h3 className="text-2xl font-black uppercase tracking-widest text-white">Recognition</h3>
              </div>
              {ACHIEVEMENTS.map((award, i) => (
                <div key={i} className="group cursor-default relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-0 group-hover:h-full bg-brand/50 transition-all duration-300" />
                  <div className="text-brand text-[10px] font-black uppercase mb-2 tracking-[0.2em]">{award.year}</div>
                  <h4 className="text-lg font-bold group-hover:text-brand transition-colors mb-2 text-white/90">{award.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{award.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <div className="flex items-center gap-3 mb-8">
                <Mic className="text-brand" size={28} />
                <h3 className="text-2xl font-black uppercase tracking-widest text-white">Thought Hub</h3>
              </div>
              {TALKS.map((talk, i) => (
                <div key={i} className="p-8 rounded-3xl bg-surface-accent border border-white/5 group hover:border-brand/50 transition-all shadow-xl">
                  <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Mic className="text-brand" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-white leading-tight">{talk.title}</h4>
                  <p className="text-gray-500 text-sm mb-8 font-light">{talk.description}</p>
                  <button className="text-[10px] text-brand font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
                    Request Deck <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-brand" size={28} />
                <h3 className="text-2xl font-black uppercase tracking-widest text-white">Community</h3>
              </div>
              <div className="space-y-8">
                  {LEADERSHIP.map((item, i) => (
                    <div key={i} className="group">
                      <h4 className="text-white font-bold mb-1 group-hover:text-brand transition-colors">{item.role}</h4>
                      <div className="text-brand text-[10px] font-black uppercase mb-3 tracking-widest">{item.organization}</div>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">{item.description}</p>
                      <div className="w-8 h-px bg-white/10 mt-6 group-hover:w-full transition-all duration-700" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Contact Module */}
        <SectionWrapper id="contact" className="py-40 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-20">
            <div className="inline-flex px-4 py-2 bg-brand/5 border border-brand/20 rounded-full text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-8">Available for Collaboration</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white">Initialize <span className="text-brand">Connection</span></h2>
            <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto italic leading-relaxed">"Let's build the future we once only imagined."</p>
          </div>
          
          <div className="grid md:grid-cols-1 gap-12 bg-surface p-10 md:p-20 rounded-[3rem] border border-white/5 shadow-[0_20px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand/[0.02] group-hover:bg-brand/[0.04] transition-colors" />
            
            {formStatus === 'success' ? (
              <div className="relative z-10 py-20 flex flex-col items-center gap-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center text-brand border border-brand/20">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white">Transmission Received</h3>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">Your message has been successfully routed to olaraonyemeka@gmail.com. I will review the payload and respond shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 px-8 py-3 bg-brand/10 text-brand border border-brand/20 font-bold rounded-xl hover:bg-brand hover:text-white transition-all uppercase tracking-widest text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="relative z-10 space-y-8 max-w-3xl mx-auto text-left" onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Full String Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="User Identification"
                      className="w-full px-8 py-5 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Email Protocol</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="address@domain.ext"
                      className="w-full px-8 py-5 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Payload Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={5} 
                    placeholder="Describe your objective..."
                    className="w-full px-8 py-5 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all resize-none font-medium"
                  />
                </div>
                
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={20} />
                    <span>Communication error. Please try again or reach out directly via LinkedIn.</span>
                  </div>
                )}

                <button 
                  disabled={formStatus === 'loading'}
                  className={`w-full py-6 bg-brand text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-4 whitespace-nowrap ${
                    formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_50px_rgba(39,128,226,0.5)]'
                  }`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Execute Contact Protocol <Send size={18} className="shrink-0" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-24">
            <a href="https://github.com/EmekaOlaraonye" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all group-hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(39,128,226,0.3)]">
                <Github size={28} />
              </div>
              <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Github</p>
                  <p className="text-sm font-bold group-hover:text-brand transition-colors">/EmekaOlaraonye</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/chukwuemeka-olaraonye/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all group-hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(39,128,226,0.3)]">
                <Linkedin size={28} />
              </div>
              <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-sm font-bold group-hover:text-brand transition-colors">/in/chukwuemeka-olaraonye</p>
              </div>
            </a>
            <a href="mailto:olaraonyemeka@gmail.com" className="group flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all group-hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(39,128,226,0.3)]">
                <Mail size={28} />
              </div>
              <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Direct</p>
                  <p className="text-sm font-bold group-hover:text-brand transition-colors">Mail Protocol</p>
              </div>
            </a>
          </div>
        </SectionWrapper>
      </main>

      <footer className="py-20 border-t border-white/5 relative overflow-hidden bg-dark">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
               <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">C</span>
               </div>
               <span className="font-bold text-white/80 tracking-widest uppercase">Chukwuemeka Olaraonye</span>
            </div>
            <p className="text-gray-600 text-xs font-medium tracking-widest uppercase italic">
              Empowering industry through intelligent architecture.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-700 text-[10px] tracking-[0.4em] uppercase mb-2">
              &copy; {new Date().getFullYear()} Digital Identity Protocol
            </p>
            <p className="text-gray-800 text-[8px] tracking-[0.2em] uppercase">
              V4.2.0 | BUILT WITH PASSION & PRECISION
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
