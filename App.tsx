
import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  Trophy,
  Mic,
  Users,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Globe,
  Sun,
  Monitor,
  Moon,
  BrainCircuit,
  Zap,
  FlaskConical,
  BadgeCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import {
  SKILLS,
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION_DATA,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  TALKS,
  LEADERSHIP,
  CATEGORY_ICONS,
  PROJECTS,
  RESEARCH
} from './constants';
import { Project } from './types';
import RecommenderDemo from './RecommenderDemo';
import portfolioPic from './portfolio-pic.JPG';
import cvPdf from './Chukwuemeka_Olaraonye_CV.pdf';

// Reveals each section as it scrolls into view.
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

const readStoredTheme = (): ThemeMode => {
  try {
    const saved = window.localStorage.getItem('theme-mode');
    if (saved === 'system' || saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) - fall through.
  }
  return 'system';
};

/* Citron marker pen behind a word or two.

   Painted as a gradient on the inline box rather than an absolutely positioned
   bar: `bottom` would resolve against the line box, so a tight `leading` on a
   large heading dragged the bar up over the glyphs and it read as a
   strikethrough. A background hugs the text's own content box, so the stripe
   sits at the baseline at every size and line-height. */
const Mark = ({ children }: { children: React.ReactNode }) => (
  <span
    className="bg-no-repeat px-[0.08em]"
    style={{ backgroundImage: 'linear-gradient(to top, rgba(200,247,81,0.85) 0.3em, transparent 0.3em)' }}
  >
    {children}
  </span>
);

const ThemeSwitch = ({
  themeMode,
  setThemeMode,
  size = 14,
  pad = 'p-2'
}: {
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
  size?: number;
  pad?: string;
}) => {
  const options: { mode: ThemeMode; label: string; Icon: typeof Monitor }[] = [
    { mode: 'system', label: 'Use system theme', Icon: Monitor },
    { mode: 'light', label: 'Use light theme', Icon: Sun },
    { mode: 'dark', label: 'Use dark theme', Icon: Moon }
  ];
  return (
    <div className="flex items-center p-1 rounded-full bg-surface border border-white/10">
      {options.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          onClick={() => setThemeMode(mode)}
          aria-label={label}
          aria-pressed={themeMode === mode}
          className={`${pad} rounded-full transition-colors ${themeMode === mode ? 'bg-brand text-on-brand' : 'text-gray-500 hover:text-white'}`}
        >
          <Icon size={size} />
        </button>
      ))}
    </div>
  );
};

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

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ['about', 'research', 'projects', 'skills', 'experience', 'achievements', 'contact'].forEach(id => {
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
    { name: 'Research', href: '#research' },
    { name: 'Work', href: '#projects' },
    { name: 'Stack', href: '#skills' },
    { name: 'Path', href: '#experience' },
    { name: 'Wins', href: '#achievements' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 md:bg-dark/85 md:backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:shadow-[0_0_24px_rgba(139,109,255,0.5)] transition-all duration-300">
            <span className="text-on-brand font-display font-bold text-xl">C</span>
          </div>
          <span className="hidden sm:block font-display font-bold text-lg tracking-tight text-white group-hover:text-brand transition-colors">
            Olaraonye
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative px-3.5 py-2 rounded-lg text-[11px] font-mono font-medium transition-all lowercase tracking-wide ${
                activeSection === link.href.substring(1)
                  ? 'text-brand bg-brand/10'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-3 px-5 py-2.5 bg-brand text-on-brand rounded-full text-xs font-bold hover:shadow-[0_0_25px_rgba(139,109,255,0.45)] transition-all active:scale-95 flex items-center gap-2 group/btn"
          >
            Say hi <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="hidden lg:block ml-4">
          <ThemeSwitch themeMode={themeMode} setThemeMode={setThemeMode} />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-white p-2 relative z-50 transition-transform active:scale-90"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-dark/98 backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden flex items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-7">
          <ThemeSwitch themeMode={themeMode} setThemeMode={setThemeMode} size={18} pad="p-3" />
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-display text-4xl font-bold tracking-tight transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${activeSection === link.href.substring(1) ? 'text-brand' : 'text-white hover:text-brand'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`mt-4 px-10 py-4 bg-brand text-on-brand font-bold rounded-full transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${navLinks.length * 60}ms` }}
          >
            Say hi
          </a>
        </div>
      </div>
    </nav>
  );
};

const STRATEGY_SCENARIOS = [
  {
    id: 'recsys',
    label: 'recommendations',
    challenge: 'A catalogue keeps growing, but the same handful of items get surfaced and the long tail never sells.',
    approach: 'Model implicit signals rather than ratings, learn the user-item interaction instead of assuming an inner product, and evaluate on top-N ranking, not RMSE.',
    stack: 'Neural collaborative filtering · embeddings · HR@K / NDCG@K',
    check: 'Measure against a matrix factorization baseline before believing the gain.'
  },
  {
    id: 'data',
    label: 'decision data',
    challenge: 'Teams have numbers everywhere and still argue about what is actually happening.',
    approach: 'Fix the definition of each metric at the point of capture, then build the smallest dashboard that answers the decision people keep re-litigating.',
    stack: 'Python · Pandas · SQL · Power BI',
    check: 'A dashboard nobody opens twice is a dashboard that answered the wrong question.'
  },
  {
    id: 'platform',
    label: 'trust boundaries',
    challenge: 'A product needs mobile and web clients fast, but those clients cannot be trusted with privileged operations.',
    approach: 'Push authorization to a service that clients cannot bypass, declare response schemas per route, and strip sensitive fields before they can ever leave.',
    stack: 'Fastify · Firebase Auth custom claims · Cloud Run',
    check: 'If the client can grant itself a role, the model is decorative.'
  }
] as const;

const NOW_BUILDING = [
  {
    title: 'Neural Collaborative Filtering for E-Commerce',
    status: 'MSc Research',
    detail: 'Benchmarking learned interaction functions against matrix factorization baselines on implicit feedback.',
    progress: '52%'
  },
  {
    title: 'Tickety — Ticketing Platform Backend',
    status: 'Building',
    detail: 'Fastify service on Cloud Run owning authorization, the event catalogue, and sales reporting.',
    progress: '60%'
  },
  {
    title: 'Mentoring & Speaking on AI Careers',
    status: 'Ongoing',
    detail: 'Service Xcellence Mentorship and the CT Graduate Conference — helping graduates build for an AI-shaped job market.',
    progress: '81%'
  }
];

const Hero = () => {
  const [text, setText] = useState('');
  const [scenarioId, setScenarioId] = useState<(typeof STRATEGY_SCENARIOS)[number]['id']>('recsys');
  const fullText = 'I build systems that learn.';
  const activeScenario = STRATEGY_SCENARIOS.find(item => item.id === scenarioId) ?? STRATEGY_SCENARIOS[0];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-12 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 glow-mesh" />
      <div className="scanline" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          {/* Left column */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface border border-white/10 text-[11px] font-mono mb-9">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-gray-300">open to 2026 roles &amp; research collabs</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight mb-8 text-white">
              {text}
              <span className="inline-block w-[3px] h-[0.85em] bg-brand ml-2 animate-pulse align-middle" />
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-6 leading-relaxed">
              MSc Computer Science researcher in Botswana, working on{' '}
              <Mark><span className="text-white font-semibold">neural collaborative filtering</span></Mark>{' '}
              for e-commerce recommendation — and shipping the backends and interfaces that put models like it in front of real users.
            </p>

            <div className="flex items-center gap-2 text-gray-500 text-sm font-mono mb-10">
              <MapPin size={14} className="text-brand" /> Gaborone, Botswana
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('projects');
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-brand text-on-brand font-bold rounded-2xl hover:shadow-[0_10px_40px_rgba(139,109,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
              >
                See my work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={cvPdf}
                download="Chukwuemeka_Olaraonye_CV.pdf"
                className="px-8 py-4 border-2 border-white/15 hover:border-accent bg-transparent hover:bg-accent/10 rounded-2xl transition-all flex items-center gap-2 group text-white font-bold"
              >
                Download CV <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right column - the approach console */}
          <div className="z-10 lg:pt-8">
            <div className="rounded-3xl bg-surface border border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-surface-accent">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-accent/80" />
                <span className="ml-3 text-[11px] font-mono text-gray-500">how-i-think.ts</span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {STRATEGY_SCENARIOS.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setScenarioId(option.id)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                        scenarioId === option.id
                          ? 'bg-brand text-on-brand'
                          : 'bg-dark border border-white/10 text-gray-500 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-5 text-sm">
                  <div>
                    <p className="text-[10px] font-mono text-accent-ink mb-1.5">// the problem</p>
                    <p className="text-gray-300 leading-relaxed">{activeScenario.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-accent-ink mb-1.5">// how I&rsquo;d approach it</p>
                    <p className="text-gray-400 leading-relaxed">{activeScenario.approach}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-accent-ink mb-1.5">// tools</p>
                    <p className="text-gray-400 leading-relaxed font-mono text-[12px]">{activeScenario.stack}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] font-mono text-brand mb-1.5">// the check</p>
                    <p className="text-gray-300 leading-relaxed">{activeScenario.check}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Infinite scrolling ticker of the stack. */
const SkillsMarquee = () => {
  const items = SKILLS.filter(s => s.category !== 'Languages').map(s => s.name);
  const doubled = [...items, ...items];
  return (
    <div className="relative py-6 border-y border-white/10 bg-surface/40 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-dark to-transparent pointer-events-none" />
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {doubled.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center gap-10 text-sm font-mono text-gray-500 whitespace-nowrap">
            {name}
            <span className="text-accent-ink" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const SectionHeading = ({
  num,
  title,
  subtitle,
  kicker
}: {
  num: string;
  title: string;
  subtitle?: string;
  kicker?: string;
}) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-5">
      <span className="font-mono text-sm text-accent-ink font-medium">{num}</span>
      <span className="w-10 h-px bg-white/20" />
      {kicker && <span className="font-mono text-xs text-gray-500 lowercase tracking-wide">{kicker}</span>}
    </div>
    <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.02]">{title}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
  </div>
);

const NowBuildingSection = () => (
  <SectionWrapper id="now" className="py-24 max-w-7xl mx-auto px-6">
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-ink text-[10px] font-mono mb-4">
          <Zap size={12} /> right now
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">What I&rsquo;m working on</h2>
      </div>
      <p className="text-gray-400 max-w-md leading-relaxed text-sm">
        Where my time actually goes — one research track, one product, and the community work around both.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {NOW_BUILDING.map((item, index) => (
        <div
          key={item.title}
          className="rounded-3xl bg-surface border border-white/10 p-7 transition-all hover:border-brand/50 hover:-translate-y-1.5 duration-300"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] font-mono text-brand bg-brand/10 border border-brand/25 px-2.5 py-1 rounded-full">
              {item.status}
            </span>
            <span className="text-sm font-mono font-semibold text-white">{item.progress}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white leading-tight mb-3">{item.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{item.detail}</p>
          <div className="mt-6 h-1.5 rounded-full bg-dark overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand to-accent rounded-full" style={{ width: item.progress }} />
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

const App = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // Read the saved preference during initialisation rather than in an effect:
  // a separate read-effect would still be holding 'system' when the write-effect
  // below first runs, which overwrites the stored choice before it is applied.
  const [themeMode, setThemeMode] = useState<ThemeMode>(readStoredTheme);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    try {
      window.localStorage.setItem('theme-mode', themeMode);
    } catch {
      // Preference simply will not persist if storage is unavailable.
    }
  }, [themeMode]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProject]);

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
        headers: { 'Accept': 'application/json' }
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
    <div className="bg-dark text-white selection:bg-accent/40 selection:text-white relative">
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />

      <main className="relative z-10">
        <Hero />
        <SkillsMarquee />
        <NowBuildingSection />

        {/* ============ ABOUT (bento) ============ */}
        <SectionWrapper id="about" className="py-28 max-w-7xl mx-auto px-6">
          <SectionHeading
            num="01"
            kicker="who's writing"
            title="Researcher by day, shipper by night."
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[minmax(0,auto)]">
            {/* Portrait */}
            <div className="md:col-span-1 lg:row-span-2 relative rounded-3xl overflow-hidden bg-surface border border-white/10 min-h-[340px] group">
              <img
                src={portfolioPic}
                alt="Chukwuemeka Olaraonye"
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-[1.2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[10px] text-accent-ink mb-1">// gaborone, botswana</p>
                <p className="font-display font-bold text-white text-lg leading-tight">
                  &ldquo;Be the change that you want to see in the world.&rdquo;
                </p>
              </div>
            </div>

            {/* Intro */}
            <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-surface border border-white/10 p-8 md:p-10">
              <p className="text-gray-300 text-lg leading-relaxed mb-5">
                I&rsquo;m an <span className="text-white font-semibold">MSc Computer Science researcher</span> at BIUST. My work sits on
                deep learning for recommender systems — specifically what a learned interaction function recovers that
                classical matrix factorization throws away.
              </p>
              <p className="text-gray-400 leading-relaxed">
                That&rsquo;s half of it. The other half is shipping: a Fastify authorization service on Cloud Run, a TypeScript
                marketplace built so no component knows where its data comes from. I care about the part of machine learning
                that <Mark><span className="text-white font-semibold">survives contact with production</span></Mark> — the data that has
                to be clean, the API that has to hold a trust boundary, the interface someone actually uses.
              </p>
            </div>

            {/* Stats */}
            <div className="rounded-3xl bg-brand p-7 flex flex-col justify-between min-h-[150px]">
              <span className="font-mono text-[10px] text-on-brand/70">bsc gpa</span>
              <div>
                <div className="font-display text-5xl font-bold text-on-brand tracking-tight">4.42</div>
                <div className="font-mono text-[11px] text-on-brand/70 mt-1">out of 5.00 · first class</div>
              </div>
            </div>

            <div className="rounded-3xl bg-accent p-7 flex flex-col justify-between min-h-[150px]">
              <span className="font-mono text-[10px] text-on-accent/70">final year project</span>
              <div>
                <div className="font-display text-5xl font-bold text-on-accent tracking-tight">1st</div>
                <div className="font-mono text-[11px] text-on-accent/70 mt-1">best in department</div>
              </div>
            </div>

            <div className="rounded-3xl bg-surface-accent border border-white/10 p-7 flex flex-col justify-between min-h-[150px]">
              <span className="font-mono text-[10px] text-gray-500">teaching since</span>
              <div>
                <div className="font-display text-5xl font-bold text-white tracking-tight">2024</div>
                <div className="font-mono text-[11px] text-gray-500 mt-1">TA · BIUST</div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ============ RESEARCH ============ */}
        <SectionWrapper id="research" className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading
              num="02"
              kicker="ai / machine learning"
              title="The research."
              subtitle="My MSc work sits on recommender systems — the part of machine learning that decides what a million people see next."
            />

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
              <div className="rounded-[2rem] bg-surface border border-white/10 p-8 md:p-11 relative overflow-hidden group hover:border-brand/40 transition-colors duration-500">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand/20 rounded-full blur-[100px] opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-7">
                    <span className="inline-flex items-center gap-2 text-[10px] font-mono text-brand border border-brand/30 bg-brand/10 px-3 py-1.5 rounded-full">
                      <FlaskConical size={12} /> {RESEARCH.status}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{RESEARCH.field}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white leading-[1.12] tracking-tight mb-10">
                    {RESEARCH.title}
                  </h3>

                  <div className="space-y-8">
                    <div className="border-l-2 border-accent pl-6">
                      <p className="text-[10px] font-mono text-accent-ink mb-2.5">// the question</p>
                      <p className="text-gray-300 leading-relaxed">{RESEARCH.question}</p>
                    </div>
                    <div className="border-l-2 border-white/15 pl-6">
                      <p className="text-[10px] font-mono text-gray-500 mb-2.5">// the approach</p>
                      <p className="text-gray-400 leading-relaxed">{RESEARCH.approach}</p>
                    </div>
                    <div className="border-l-2 border-white/15 pl-6">
                      <p className="text-[10px] font-mono text-gray-500 mb-2.5">// why it matters</p>
                      <p className="text-gray-400 leading-relaxed">{RESEARCH.why}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] bg-surface-accent border border-white/10 p-8">
                  <p className="text-[11px] font-mono text-gray-500 mb-7">// the core idea, in one picture</p>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-dark/60 p-5">
                      <p className="text-[10px] font-mono text-gray-500 mb-4">matrix factorization</p>
                      <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                        <span className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">user</span>
                        <span className="text-gray-600">·</span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">item</span>
                        <ArrowRight size={12} className="text-gray-600" />
                        <span className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400">score</span>
                      </div>
                      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">A fixed inner product. The interaction is assumed, never learned.</p>
                    </div>

                    <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 relative overflow-hidden">
                      <p className="text-[10px] font-mono text-accent-ink mb-4">neural collaborative filtering</p>
                      <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                        <span className="px-2.5 py-1.5 rounded-lg bg-dark/60 border border-white/10 text-gray-300">user</span>
                        <span className="text-gray-500">+</span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-dark/60 border border-white/10 text-gray-300">item</span>
                        <ArrowRight size={12} className="text-brand" />
                        <span className="px-2.5 py-1.5 rounded-lg bg-brand text-on-brand font-semibold">learned f()</span>
                        <ArrowRight size={12} className="text-brand" />
                        <span className="px-2.5 py-1.5 rounded-lg bg-dark/60 border border-white/10 text-gray-300">score</span>
                      </div>
                      <p className="text-[12px] text-gray-400 mt-4 leading-relaxed">
                        The network learns the interaction function itself — free to model relationships a dot product cannot express.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-surface border border-white/10 p-8">
                  <p className="text-[11px] font-mono text-gray-500 mb-5">// methods &amp; tooling</p>
                  <div className="flex flex-wrap gap-2">
                    {RESEARCH.methods.map(m => (
                      <span key={m} className="px-3 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand text-[11px] font-mono">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {TALKS.map(talk => (
                  <div key={talk.title} className="rounded-[2rem] bg-surface border border-white/10 p-8 hover:border-accent/40 transition-colors group">
                    <div className="flex items-center gap-2 mb-5">
                      <Mic size={14} className="text-accent-ink" />
                      <p className="text-[11px] font-mono text-gray-500">// speaking</p>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white leading-snug mb-3 group-hover:text-brand transition-colors">{talk.title}</h4>
                    <p className="text-[11px] font-mono text-accent-ink mb-4">{talk.venue} · {talk.date}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{talk.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <RecommenderDemo />
            </div>
          </div>
        </SectionWrapper>

        {/* ============ PROJECTS (staggered rows) ============ */}
        <SectionWrapper id="projects" className="py-28 max-w-7xl mx-auto px-6">
          <SectionHeading
            num="03"
            kicker="things I built"
            title="Selected work."
            subtitle="Three projects and the decisions behind them. Every link goes to real code."
          />

          <div className="space-y-6">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`group relative rounded-[2rem] border border-white/10 bg-surface overflow-hidden transition-all duration-500 hover:border-brand/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.25)] ${
                  i % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'
                }`}
              >
                <div className="grid lg:grid-cols-[auto_1fr_auto] gap-8 p-8 md:p-10 items-start">
                  {/* Big index */}
                  <div className="font-display text-6xl md:text-7xl font-bold text-white/10 leading-none select-none group-hover:text-brand/30 transition-colors duration-500">
                    0{i + 1}
                  </div>

                  {/* Body */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-[10px] font-mono rounded-full">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[11px] font-mono text-gray-500">{project.year}</span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-brand transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">{project.description}</p>

                    <div className="rounded-2xl border border-white/10 bg-dark/50 p-5 mb-6 max-w-2xl">
                      <p className="text-[10px] font-mono text-accent-ink mb-2">// what it achieves</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{project.impact}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-dark border border-white/10 text-[10px] font-mono text-gray-500">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 text-brand text-sm font-bold hover:gap-3.5 transition-all"
                      >
                        Read the case study <ArrowRight size={15} />
                      </button>
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-[12px] font-mono transition-colors">
                          <Github size={14} /> code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-ink text-[12px] font-mono transition-colors">
                          <ExternalLink size={14} /> live site
                        </a>
                      )}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={28}
                    className="hidden lg:block text-gray-700 group-hover:text-brand group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 shrink-0"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/EmekaOlaraonye"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/15 bg-surface hover:border-accent hover:bg-accent/10 text-gray-300 hover:text-white transition-all text-sm font-mono group"
            >
              <Github size={16} /> more on github
              <ArrowUpRight size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </SectionWrapper>

        {/* ============ SKILLS ============ */}
        <SectionWrapper id="skills" className="py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading
              num="04"
              kicker="the toolkit"
              title="What I reach for."
              subtitle="Grouped by the layer of the problem it solves — from model to deployment."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat}
                  className="p-7 rounded-3xl bg-surface border border-white/10 hover:border-brand/45 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <div className="mb-6 p-3.5 bg-brand/10 w-fit rounded-2xl group-hover:bg-brand transition-all group-hover:scale-110 duration-300">
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <h3 className="font-display font-bold text-base mb-5 text-white leading-tight">{cat}</h3>
                  <div className="space-y-2.5">
                    {SKILLS.filter(s => s.category === cat).map(skill => (
                      <div key={skill.name} className="text-gray-400 text-[13px] font-mono flex items-center gap-2.5 group-hover:text-gray-300 transition-colors">
                        <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ============ EXPERIENCE + EDUCATION ============ */}
        <SectionWrapper id="experience" className="py-28 relative">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading num="05" kicker="how I got here" title="The path so far." />

            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2.5 bg-brand/10 rounded-xl text-brand">
                    <Briefcase size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Experience</h3>
                </div>
                <div className="space-y-12">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="relative pl-10 border-l-2 border-white/10 group">
                      <div className="absolute top-1 left-[-9px] w-4 h-4 bg-dark border-[3px] border-brand rounded-full group-hover:border-accent group-hover:scale-125 transition-all" />
                      <div className="font-mono text-xs text-accent-ink mb-2">{exp.period}</div>
                      <h4 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-brand transition-colors">{exp.role}</h4>
                      <div className="text-gray-500 text-sm mb-5 flex items-center gap-2">
                        <Globe size={13} /> {exp.company}
                      </div>
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-400 text-sm leading-relaxed flex gap-3">
                            <span className="text-accent-ink font-mono shrink-0">→</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2.5 bg-brand/10 rounded-xl text-brand">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Education</h3>
                </div>
                <div className="space-y-5">
                  {EDUCATION_DATA.map((edu, idx) => (
                    <div key={idx} className="p-8 rounded-3xl bg-surface border border-white/10 hover:border-brand/40 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-brand transition-colors leading-tight">{edu.degree}</h4>
                        <span className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-mono rounded-full border border-white/10 shrink-0">{edu.period}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{edu.institution}</p>
                      {edu.gpa && (
                        <div className="inline-flex items-center gap-2 text-accent-ink font-mono text-sm mb-4 py-1.5 px-3 bg-accent/10 rounded-lg border border-accent/25">
                          <Trophy size={14} /> GPA {edu.gpa}
                        </div>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ============ AWARDS / CERTS / LEADERSHIP ============ */}
        <SectionWrapper id="achievements" className="py-28 max-w-7xl mx-auto px-6">
          <SectionHeading num="06" kicker="receipts" title="Wins & community." />

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-9">
                <Trophy className="text-accent-ink" size={24} />
                <h3 className="font-display text-xl font-bold text-white">Awards</h3>
              </div>
              <div className="space-y-9">
                {ACHIEVEMENTS.map((award, i) => (
                  <div key={i} className="group relative pl-6 border-l-2 border-white/10 hover:border-accent transition-colors">
                    <div className="font-mono text-[11px] text-accent-ink mb-2">{award.year}</div>
                    <h4 className="font-display font-bold text-white mb-2 leading-snug group-hover:text-brand transition-colors">{award.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-9">
                <BadgeCheck className="text-accent-ink" size={24} />
                <h3 className="font-display text-xl font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-5">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-surface border border-white/10 group hover:border-brand/40 transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h4 className="font-display font-bold text-white leading-snug group-hover:text-brand transition-colors">{cert.title}</h4>
                      <span className="text-[10px] font-mono text-gray-500 shrink-0 mt-1">{cert.date}</span>
                    </div>
                    <p className="text-[11px] font-mono text-accent-ink mb-3">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-9">
                <Users className="text-accent-ink" size={24} />
                <h3 className="font-display text-xl font-bold text-white">Leadership</h3>
              </div>
              <div className="space-y-7">
                {LEADERSHIP.map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="font-display font-bold text-white mb-1 group-hover:text-brand transition-colors">{item.role}</h4>
                    <div className="font-mono text-[11px] text-accent-ink mb-2.5">{item.organization}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    <div className="w-8 h-px bg-white/15 mt-5 group-hover:w-full group-hover:bg-accent/50 transition-all duration-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ============ CONTACT ============ */}
        <SectionWrapper id="contact" className="py-32 max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 border border-accent/30 rounded-full text-accent-ink text-[11px] font-mono mb-8">
              <Sparkles size={13} /> open to opportunities
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-7 text-white leading-[1.02]">
              Let&rsquo;s build <Mark>something</Mark>.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Hiring, collaborating on research, or want to argue about recommender systems? I read every message and reply.
            </p>
          </div>

          <div className="bg-surface p-8 md:p-14 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            {formStatus === 'success' ? (
              <div className="py-16 flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center text-accent-ink border border-accent/30">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">Message sent</h3>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out — it&rsquo;s on its way to olaraonyemeka@gmail.com. I&rsquo;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-2 px-8 py-3 bg-brand/10 text-brand border border-brand/25 font-bold rounded-xl hover:bg-brand hover:text-on-brand transition-all text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="space-y-7 max-w-2xl mx-auto text-left" onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-7">
                  <div className="space-y-3">
                    <label htmlFor="name" className="font-mono text-[11px] text-gray-500">your name</label>
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="font-mono text-[11px] text-gray-500">email address</label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label htmlFor="message" className="font-mono text-[11px] text-gray-500">message</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me what you have in mind..."
                    className="w-full px-6 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none"
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={20} className="shrink-0" />
                    <span>Something went wrong sending that. Please try again, or reach me directly on LinkedIn or by email.</span>
                  </div>
                )}

                <button
                  disabled={formStatus === 'loading'}
                  className={`w-full py-5 bg-brand text-on-brand font-bold rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                    formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_10px_40px_rgba(139,109,255,0.45)]'
                  }`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-brand/30 border-t-on-brand rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send message <Send size={18} className="shrink-0" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {[
              { href: 'https://github.com/EmekaOlaraonye', Icon: Github, label: 'github', value: '/EmekaOlaraonye' },
              { href: 'https://www.linkedin.com/in/chukwuemeka-olaraonye/', Icon: Linkedin, label: 'linkedin', value: '/chukwuemeka-olaraonye' },
              { href: 'mailto:olaraonyemeka@gmail.com', Icon: Mail, label: 'email', value: 'olaraonyemeka@gmail.com' }
            ].map(({ href, Icon, label, value }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface border border-white/10 hover:border-brand/45 hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-on-brand transition-all">
                  <Icon size={20} />
                </div>
                <div className="text-left">
                  <p className="font-mono text-[10px] text-gray-500 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-white group-hover:text-brand transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </SectionWrapper>
      </main>

      {/* ============ CASE STUDY MODAL ============ */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[70] bg-dark/92 backdrop-blur-md flex items-center justify-center px-4 py-8"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} case study`}
        >
          <div
            className="w-full max-w-3xl max-h-[88vh] overflow-y-auto custom-scrollbar bg-surface border border-white/10 rounded-[2rem] p-8 md:p-11 relative shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-dark border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-accent-ink border border-accent/30 bg-accent/10 px-3 py-1.5 rounded-full">
                case study
              </span>
              <span className="text-[11px] font-mono text-gray-500">{selectedProject.year}</span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-7">{selectedProject.title}</h3>

            <div className="flex flex-wrap gap-2 mb-9">
              {selectedProject.stack.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-dark border border-white/10 text-[11px] font-mono text-gray-400">
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              {([
                ['the problem', selectedProject.problem],
                ['the constraint', selectedProject.constraint],
                ['the key decision', selectedProject.decision],
                ['the outcome', selectedProject.impact]
              ] as const).map(([label, body]) => (
                <div key={label} className="border-l-2 border-white/15 pl-5">
                  <p className="text-[10px] font-mono text-accent-ink mb-2">// {label}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-white/10 bg-dark/60 p-6">
              <p className="text-[10px] font-mono text-gray-500 mb-4">// engineering highlights</p>
              <ul className="space-y-3">
                {selectedProject.highlights.map(h => (
                  <li key={h} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                    <CheckCircle2 size={15} className="text-accent-ink shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              {selectedProject.repo && (
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand text-on-brand font-bold rounded-xl hover:shadow-[0_8px_30px_rgba(139,109,255,0.4)] transition-all inline-flex items-center gap-2"
                >
                  View the code <Github size={15} />
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-accent/50 text-accent-ink font-bold rounded-xl hover:bg-accent/10 transition-all inline-flex items-center gap-2"
                >
                  Live site <ExternalLink size={15} />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="py-16 border-t border-white/10 relative overflow-hidden bg-dark">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2.5 mb-3 justify-center md:justify-start">
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-on-brand font-display font-bold text-sm">C</span>
              </div>
              <span className="font-display font-bold text-white">Chukwuemeka Olaraonye</span>
            </div>
            <p className="text-gray-500 text-xs font-mono">
              msc researcher · recommender systems · gaborone, botswana
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs font-mono mb-1.5">
              &copy; {new Date().getFullYear()} — built with react, typescript &amp; tailwind
            </p>
            <p className="text-gray-600 text-[11px] font-mono">
              <Terminal size={11} className="inline mr-1.5 -mt-0.5" />
              designed &amp; coded from scratch
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
