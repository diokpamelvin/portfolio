import React, { useState, useEffect, useRef } from 'react'

/* ─── DATA ─────────────────────────────────────────────────────── */
const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SKILLS = {
  Frontend:   ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  Backend:    ['Node.js', 'Express.js', 'REST API Design', 'Middleware Architecture'],
  Database:   ['MongoDB', 'MongoDB Atlas', 'NoSQL Modeling'],
  'AI & Tools': ['Google Gemini API', 'Prompt Engineering', 'Conversational AI', 'Figma'],
  DevOps:     ['Git & GitHub', 'Vercel', 'Render', 'JWT Auth', 'bcrypt'],
}

const PROJECTS = [
  {
    title: 'UniMind',
    tag: 'Featured Project',
    tagColor: '#63B3ED',
    desc: 'An AI-powered mental health support platform built for university students. Delivers personalised conversational support, mood tracking, journaling, addiction recovery tools, and a curated wellness resource library — all in one place.',
    problem: 'Campus mental health services are overwhelmed and inaccessible. Students need support at 2am, not during office hours.',
    features: [
      'AI Conversation Support via Google Gemini API',
      'Daily Mood Tracker & Trend Visualisation',
      'Private Journal with session history',
      'Addiction Recovery Tracker (substances & behavioural)',
      'Curated Wellness Resource Library',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'JWT', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/diokpamelvin',
    live: null,
    status: 'In Development',
  },
]

const EXPERIENCE = [
  {
    role: 'Senior Trainee',
    company: 'HealthTouch Ltd',
    period: 'Feb 2025 – Jun 2025',
    type: 'Professional',
    bullets: [
      'Managed operational records and data integrity workflows across multiple branch locations.',
      'Supported cross-branch staff onboarding and training coordination.',
      'Promoted to Senior Trainee based on consistent performance and reliability.',
    ],
  },
  {
    role: 'Founder & CEO',
    company: 'MelGrizz BBQ',
    period: 'Jun 2024 – Present',
    type: 'Entrepreneurial',
    bullets: [
      'Founded and scaled a campus food business to 30+ successfully executed events.',
      'Built and led a four-person operational team handling logistics, inventory, and customer service.',
      'Owned all business functions: budgeting, marketing, event coordination, and team management.',
    ],
  },
]

/* ─── HOOKS ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── SMALL COMPONENTS ──────────────────────────────────────────── */
function Tag({ children, color = 'var(--accent)' }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 4,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
      border: `1px solid ${color}40`, color, background: `${color}12`,
      fontFamily: 'var(--font-display)',
    }}>{children}</span>
  )
}

function StackBadge({ label }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px', borderRadius: 4,
      fontSize: 12, fontFamily: 'var(--font-body)',
      background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
      border: '1px solid var(--border)', marginRight: 6, marginBottom: 6,
    }}>{label}</span>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

function AnimSection({ children, style = {} }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      ...style,
    }}>{children}</div>
  )
}

/* ─── NAV ───────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 clamp(20px, 5vw, 80px)',
    height: 64,
    background: scrolled ? 'rgba(10,15,30,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  }
  return (
    <nav style={navStyle}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
        dm<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l}</a>
        ))}
        <a href="#contact" style={{
          padding: '8px 20px', borderRadius: 6, fontSize: 14, fontWeight: 600,
          background: 'transparent', border: '1px solid var(--accent)',
          color: 'var(--accent)', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#0A0F1E' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)' }}
        >Hire Me</a>
      </div>
    </nav>
  )
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="about" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'clamp(80px,10vh,120px) clamp(20px,8vw,120px) 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 760, position: 'relative' }}>
        <div style={{ marginBottom: 24 }}>
          <Tag>Available for opportunities</Tag>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(42px, 7vw, 80px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', color: '#fff', marginBottom: 24,
        }}>
          Diokpa Melvin<br />
          <span style={{ color: 'var(--accent)' }}>Chinonso</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-muted)',
          lineHeight: 1.7, marginBottom: 16, maxWidth: 580,
        }}>
          Full-Stack Developer & AI Integration Specialist based in Lagos, Nigeria.
        </p>
        <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 48, maxWidth: 560 }}>
          I build full-stack web applications and AI-powered products. Currently finishing my CS degree at Trinity University while developing{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 500 }}>UniMind</span> — a mental health platform for students.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#projects" style={{
            padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: 15,
            background: 'var(--accent)', color: '#0A0F1E',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 0 rgba(99,179,237,0)',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(99,179,237,0.3)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 0 rgba(99,179,237,0)' }}
          >View My Work</a>
          <a href="/Diokpa_Melvin_CV.pdf" download style={{
            padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: 15,
            background: 'transparent', color: 'var(--text)',
            border: '1px solid var(--border)', transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
          >Download CV</a>
        </div>

        {/* Social row */}
        <div style={{ display: 'flex', gap: 20, marginTop: 48, alignItems: 'center' }}>
          {[
            { label: 'GitHub', url: 'https://github.com/diokpamelvin' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/diokpamelvin' },
            { label: 'Email', url: 'mailto:diokpamelvin29@gmail.com' },
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-dim)', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SKILLS ────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,8vw,120px)' }}>
      <AnimSection>
        <SectionLabel>TECHNICAL SKILLS</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 24,
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 16 }}>{cat.toUpperCase()}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map(skill => (
                  <span key={skill} style={{
                    padding: '5px 12px', borderRadius: 4, fontSize: 13,
                    background: 'rgba(255,255,255,0.04)', color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimSection>
    </section>
  )
}

/* ─── PROJECTS ──────────────────────────────────────────────────── */
function Projects() {
  const [expanded, setExpanded] = useState(false)
  const p = PROJECTS[0]
  return (
    <section id="projects" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,8vw,120px)' }}>
      <AnimSection>
        <SectionLabel>PROJECTS</SectionLabel>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {/* Top bar */}
          <div style={{ padding: '32px 36px 0', borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ marginBottom: 10 }}>
                  <Tag color={p.tagColor}>{p.tag}</Tag>
                  <span style={{ marginLeft: 10 }}><Tag color="#10B981">{p.status}</Tag></span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{p.title}</h2>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href={p.github} target="_blank" rel="noreferrer" style={{
                  padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: '1px solid var(--border)', color: 'var(--text-muted)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >GitHub →</a>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 36px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 24, maxWidth: 680 }}>{p.desc}</p>

            {/* Problem callout */}
            <div style={{
              background: 'rgba(99,179,237,0.06)', border: '1px solid rgba(99,179,237,0.15)',
              borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0',
              padding: '14px 20px', marginBottom: 28,
            }}>
              <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em' }}>THE PROBLEM  </span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{p.problem}</span>
            </div>

            {/* Features toggle */}
            <button onClick={() => setExpanded(!expanded)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent)', fontSize: 14, fontWeight: 600, padding: 0,
              marginBottom: expanded ? 16 : 0, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {expanded ? '▾' : '▸'} {expanded ? 'Hide' : 'Show'} features ({p.features.length})
            </button>
            {expanded && (
              <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, color: 'var(--text)', fontSize: 14 }}>
                    <span style={{ color: 'var(--green)', marginTop: 2, flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Stack */}
            <div style={{ marginTop: 20 }}>
              {p.stack.map(s => <StackBadge key={s} label={s} />)}
            </div>
          </div>
        </div>

        {/* More projects placeholder */}
        <div style={{
          marginTop: 20, padding: '28px 36px', borderRadius: 16,
          border: '1px dashed var(--border)', textAlign: 'center',
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>More projects coming soon — check back or visit my <a href="https://github.com/diokpamelvin" target="_blank" rel="noreferrer">GitHub</a></p>
        </div>
      </AnimSection>
    </section>
  )
}

/* ─── EXPERIENCE ────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,8vw,120px)' }}>
      <AnimSection>
        <SectionLabel>EXPERIENCE & EDUCATION</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20, marginBottom: 20 }}>
          {EXPERIENCE.map(e => (
            <div key={e.company} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 28,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={el => el.currentTarget.style.borderColor = 'var(--border-accent)'}
              onMouseLeave={el => el.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                <Tag color={e.type === 'Entrepreneurial' ? '#F59E0B' : 'var(--accent)'}>{e.type}</Tag>
                <span style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-display)' }}>{e.period}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>{e.role}</h3>
              <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, marginBottom: 16 }}>{e.company}</p>
              <ul style={{ listStyle: 'none' }}>
                {e.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }}>▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(99,179,237,0.06) 100%)',
          border: '1px solid rgba(124,58,237,0.2)', borderRadius: 12, padding: 28,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            <div>
              <Tag color="#7C3AED">Education</Tag>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff', marginTop: 10 }}>B.Sc. (Hons) Computer Science</h3>
              <p style={{ color: 'var(--accent)', fontSize: 15, fontWeight: 500, marginTop: 2 }}>Trinity University, Yaba · Lagos</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>2022 – 2026 (Expected)</p>
              <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginTop: 4 }}>4.01 <span style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 400 }}>/ 5.00 GPA</span></p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Final Year Project: </span>
            Design and Development of UniMind: A Smart Mental Health Support System for Tertiary Students
          </p>
        </div>
      </AnimSection>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText('diokpamelvin29@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="contact" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,8vw,120px)' }}>
      <AnimSection>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Let's build something<br /><span style={{ color: 'var(--accent)' }}>together.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}>
            I'm currently open to Graduate Software Engineer and Full-Stack Developer roles. Whether it's a full-time position, contract work, or a collaboration — reach out and let's talk.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <button onClick={copy} style={{
              padding: '16px 40px', borderRadius: 10, fontWeight: 700, fontSize: 16,
              background: 'var(--accent)', color: '#0A0F1E', border: 'none', cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s', width: '100%', maxWidth: 360,
              fontFamily: 'var(--font-display)',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(99,179,237,0.35)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
            >
              {copied ? '✓ Copied!' : 'Copy Email Address'}
            </button>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'GitHub', url: 'https://github.com/diokpamelvin' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/diokpamelvin' },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{s.label} →</a>
              ))}
            </div>
          </div>
        </div>
      </AnimSection>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '24px clamp(20px,8vw,120px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
    }}>
      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>© 2025 Diokpa Melvin Chinonso</span>
      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Built with React + Vite · Deployed on Vercel</span>
    </footer>
  )
}

/* ─── APP ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
