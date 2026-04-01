import { useState, useEffect, useRef } from "react";

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── SVG Icons ──────────────────────────────────────────────────────────────
const Icon = ({ d, children, size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const icons = {
  zap: <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  layout: <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  eye: <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  trendingUp: <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  code: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  pen: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  gauge: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>,
  barChart: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  mail: <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  pin: <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};

// ── Data ───────────────────────────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: "zap",        label: "Performance",    val: "Reduced LCP from 23s → 1.6s at Chowly — a 93% improvement through Core Web Vitals auditing." },
  { icon: "layout",     label: "Design Systems",  val: "Built and maintained shared component libraries across multiple products at ImPACT Applications." },
  { icon: "eye",        label: "Accessibility",   val: "Conducted WCAG 2.1 AA audits and full remediations across 200+ pages." },
  { icon: "trendingUp", label: "Conversion",      val: "A/B tested UI, content, and layouts — achieving up to 3x conversion rate improvements." },
];

const SKILLS = [
  { icon: "code",     title: "Languages & Frameworks", tags: ["React","TypeScript","JavaScript","HTML","CSS","PHP","WordPress"] },
  { icon: "pen",      title: "Design & Prototyping",   tags: ["Figma","Adobe Suite","Wireframing","Design Systems","Component Libraries"] },
  { icon: "gauge",    title: "Performance & SEO",      tags: ["Core Web Vitals","Lighthouse","LCP/CLS","Technical SEO","Schema Markup"] },
  { icon: "barChart", title: "Analytics & Testing",    tags: ["GA4","Google Tag Manager","A/B Testing","Conversion Optimization"] },
];

const PROJECTS = [
  { company: "Chowly",              title: "Core Web Vitals Overhaul",        desc: "Audited and rebuilt performance architecture of 200+ marketing pages. Targeted LCP bottlenecks, deferred non-critical assets, and restructured image delivery.", stat: "23s → 1.6s", statLabel: "LCP",               tags: ["Performance","Lighthouse","WordPress"] },
  { company: "Chowly",              title: "Component & Template Library",    desc: "Architected a scalable design system from scratch — shared patterns, naming conventions, and documentation to accelerate team velocity across all pages.",   stat: "200+",       statLabel: "pages built",         tags: ["Design Systems","Figma","HTML/CSS/JS"] },
  { company: "ImPACT Applications", title: "A/B Testing & Conversion Program",desc: "Ran systematic experiments across UI layouts, CTAs, and content hierarchy. Instrumented GA4 and GTM, iterated on funnel data to drive measurable lifts.",   stat: "3×",         statLabel: "conversion lift",     tags: ["React","GA4","A/B Testing"] },
  { company: "ImPACT Applications", title: "Multi-Product Design System",     desc: "Maintained a shared React component library across five web properties — marketing, LMS, and eCommerce — balancing consistency with fast product iteration.",  stat: "5",          statLabel: "products unified",    tags: ["React","WordPress","Design Systems"] },
  { company: "Chowly",              title: "Accessibility Audit & Remediation",desc:"Full WCAG 2.1 AA audit across the site footprint. Remediations for contrast ratios, keyboard navigation, ARIA labels, and semantic HTML structure.",           stat: "WCAG",       statLabel: "2.1 AA compliant",    tags: ["Accessibility","WCAG 2.1","HTML"] },
  { company: "Chowly",              title: "Figma Prototyping & Validation",   desc:"High-fidelity prototypes to validate interaction patterns before any code was written — reducing late-stage rework and aligning stakeholders early.",            stat: "Design",     statLabel: "→ code pipeline",    tags: ["Figma","UX Design","Prototyping"] },
];

const EXPERIENCE = [
  {
    dates: "Jan 2024 – Present",
    role: "Frontend Developer & UX Engineer (Contract)",
    company: "Chowly",
    bullets: [
      "Built and launched 200+ responsive pages using WordPress and custom HTML/CSS/JS",
      "Improved LCP from 23s → 1.6s (93% reduction) via Core Web Vitals optimization",
      "Developed reusable component library, establishing a scalable design system",
      "Built Figma prototypes to validate UI and interaction designs prior to coding",
      "Conducted WCAG 2.1 AA accessibility audits and full remediations",
      "Integrated third-party APIs and tools into frontend workflows",
    ],
  },
  {
    dates: "Sep 2019 – Jan 2024",
    role: "Frontend Developer",
    company: "ImPACT Applications, Inc.",
    bullets: [
      "Owned frontend development across 5 web properties — marketing, LMS, eCommerce",
      "Built and iterated on React UI components; maintained shared design system",
      "Ran A/B tests increasing conversion rates up to 3× on key pages",
      "Implemented GA4 and GTM for user behavior tracking and funnel analysis",
    ],
  },
  {
    dates: "2016 – 2018",
    role: "Content Manager",
    company: "Signature Analytics / Zingle / ANI",
    bullets: [
      "Built and maintained WordPress sites with custom templates",
      "Implemented SEO strategies improving organic visibility across multiple properties",
    ],
  },
];

// ── CSS Variables ──────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--sans);
    background: var(--cream);
    color: var(--ink);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  :root {
    --cream: #FAF8F4;
    --ink: #1A1A18;
    --ink-muted: #6B6B63;
    --accent: #2B5CE6;
    --accent-bg: #E8ECF5;
    --accent-bg-deep: #D6DCF0;
    --border: rgba(26,26,24,0.10);
    --serif: 'DM Serif Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }
  @media (max-width: 768px) {
    .about-grid  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .exp-item    { grid-template-columns: 1fr !important; }
    .hero-after  { display: none !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── Shared style helpers ───────────────────────────────────────────────────
const tag = {
  fontSize: "0.7rem", padding: "0.22rem 0.6rem",
  background: "var(--cream)", border: "1px solid var(--border)",
  borderRadius: "2px", color: "var(--ink-muted)",
};

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav({ dark }) {
  const bg   = dark ? "rgba(26,26,24,0.92)"    : "rgba(250,248,244,0.9)";
  const col  = dark ? "#FAF8F4"                : "#1A1A18";
  const muted= dark ? "rgba(250,248,244,0.5)"  : "#6B6B63";
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"1.25rem 2.5rem",
      background:bg,backdropFilter:"blur(12px)",
      borderBottom:"1px solid var(--border)",transition:"background 0.3s",
    }}>
      <div style={{ fontFamily:"var(--serif)",fontSize:"1.1rem",color:col }}>Keri Bienert</div>
      <ul style={{ display:"flex",gap:"2rem",listStyle:"none",padding:0,margin:0 }}>
        {["about","skills","projects","contact"].map(id => (
          <li key={id}>
            <button onClick={() => scrollTo(id)} style={{
              background:"none",border:"none",cursor:"pointer",
              fontSize:"0.8rem",fontWeight:400,color:muted,
              letterSpacing:"0.06em",textTransform:"uppercase",transition:"color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = col}
              onMouseLeave={e => e.target.style.color = muted}
            >{id}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section style={{
      minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",
      padding:"0 2.5rem 5rem",position:"relative",overflow:"hidden",background:"var(--cream)",
    }}>
      {/* Diagonal architectural lines */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:`
          linear-gradient(135deg,transparent 49.8%,rgba(26,26,24,0.04) 49.8%,rgba(26,26,24,0.04) 50.2%,transparent 50.2%),
          linear-gradient(45deg, transparent 49.8%,rgba(26,26,24,0.03) 49.8%,rgba(26,26,24,0.03) 50.2%,transparent 50.2%)
        `,
      }}/>
      {/* Vertical accent line */}
      <div className="hero-after" style={{
        position:"absolute",top:"15%",bottom:"15%",left:"55%",
        width:1,background:"linear-gradient(to bottom,transparent,rgba(43,92,230,0.18),transparent)",
        pointerEvents:"none",
      }}/>
      <div style={{ position:"relative",zIndex:1,maxWidth:900 }}>
        <FadeIn delay={0.1}>
          <span style={{
            display:"inline-flex",alignItems:"center",gap:"0.5rem",
            fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",
            color:"var(--accent)",background:"var(--accent-bg)",
            padding:"0.35rem 0.9rem",borderRadius:"2px",marginBottom:"1.5rem",
          }}>
            <span style={{ width:6,height:6,background:"var(--accent)",borderRadius:"50%",display:"inline-block" }}/>
            Frontend Developer & UX Engineer · San Diego, CA
          </span>
          <h1 style={{
            fontFamily:"var(--serif)",fontSize:"clamp(3rem,7vw,6rem)",
            lineHeight:1.0,letterSpacing:"-0.02em",marginBottom:"1.5rem",color:"var(--ink)",
          }}>
            Design that<br/>ships <em style={{ fontStyle:"italic",color:"var(--accent)" }}>beautifully.</em>
          </h1>
          <p style={{ fontSize:"1.1rem",fontWeight:300,color:"var(--ink-muted)",maxWidth:540,lineHeight:1.7,marginBottom:"2.5rem" }}>
            6+ years translating Figma concepts into pixel-precise, responsive React interfaces — from first prototype to production.
          </p>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center" }}>
            {[
              { label:"View my work", id:"projects", primary:true },
              { label:"Get in touch", id:"contact",  primary:false },
            ].map(({ label, id, primary }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                display:"inline-block",padding:"0.8rem 1.75rem",
                background: primary ? "var(--ink)" : "transparent",
                color: primary ? "var(--cream)" : "var(--ink)",
                fontSize:"0.85rem",fontWeight: primary ? 500 : 400,
                border: primary ? "none" : "1px solid rgba(26,26,24,0.25)",
                borderRadius:"2px",cursor:"pointer",letterSpacing:"0.03em",fontFamily:"var(--sans)",
                transition:"background 0.2s,transform 0.15s,border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background=primary?"var(--accent)":"transparent"; e.currentTarget.style.transform="translateY(-1px)"; if(!primary) e.currentTarget.style.borderColor="var(--ink)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=primary?"var(--ink)":"transparent"; e.currentTarget.style.transform="translateY(0)"; if(!primary) e.currentTarget.style.borderColor="rgba(26,26,24,0.25)"; }}
              >{label}</button>
            ))}
          </div>
          <div style={{ display:"flex",gap:"3rem",paddingTop:"3rem",borderTop:"1px solid var(--border)",marginTop:"2rem",flexWrap:"wrap" }}>
            {[["6+","Years experience"],["200+","Pages shipped"],["93%","LCP improvement"]].map(([num,lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily:"var(--serif)",fontSize:"2.2rem",color:"var(--ink)",display:"block" }}>{num}</span>
                <span style={{ fontSize:"0.72rem",color:"var(--ink-muted)",textTransform:"uppercase",letterSpacing:"0.08em" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding:"6rem 2.5rem",background:"#fff",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
      <div className="about-grid" style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start" }}>
        <FadeIn>
          <p style={{ fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem" }}>About</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.1,marginBottom:"1rem" }}>Where design<br/>meets code.</h2>
          {[
            <p>I'm a frontend developer and UX engineer who lives in the space between <strong style={{color:"var(--ink)",fontWeight:500}}>Figma and the browser</strong> — comfortable enough with design systems to build them, and fluent enough in React to own production UI end-to-end.</p>,
            <p>I've spent 6+ years working on <strong style={{color:"var(--ink)",fontWeight:500}}>marketing sites, LMS platforms, eCommerce, and SaaS products</strong>, partnering with design, product, and engineering to ship interfaces that are fast, accessible, and genuinely delightful to use.</p>,
            <p>Currently based in <strong style={{color:"var(--ink)",fontWeight:500}}>San Diego, CA</strong>, open to hybrid and remote roles.</p>,
          ].map((p, i) => <div key={i} style={{ fontSize:"1.05rem",lineHeight:1.8,color:"var(--ink-muted)",marginBottom:"1.25rem" }}>{p}</div>)}
        </FadeIn>
        <FadeIn delay={0.12}>
          <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
            {HIGHLIGHTS.map(({ icon, label, val }) => (
              <div key={label} style={{
                display:"flex",gap:"1rem",alignItems:"flex-start",
                padding:"1.25rem 1.5rem",background:"var(--cream)",
                border:"1px solid var(--border)",borderRadius:"2px",
              }}>
                <div style={{ width:20,height:20,flexShrink:0,marginTop:"0.15rem",borderRadius:"2px",background:"var(--accent-bg)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  {icons[icon]}
                </div>
                <div>
                  <div style={{ fontSize:"0.78rem",fontWeight:500,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"0.2rem" }}>{label}</div>
                  <div style={{ fontSize:"0.92rem",color:"var(--ink)" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding:"6rem 2.5rem" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FadeIn>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:"2rem",flexWrap:"wrap",marginBottom:"3.5rem" }}>
            <div>
              <p style={{ fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem" }}>Skills</p>
              <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.1,marginBottom:"1rem" }}>Full-stack design<br/>&amp; development.</h2>
            </div>
            <p style={{ fontSize:"1rem",color:"var(--ink-muted)",maxWidth:480 }}>Spanning the full design-to-code workflow — from wireframes and prototypes to production-ready components.</p>
          </div>
        </FadeIn>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem" }}>
          {SKILLS.map(({ icon, title, tags }, i) => (
            <FadeIn key={title} delay={i * 0.06}>
              <div style={{ padding:"1.75rem",background:"#fff",border:"1px solid var(--border)",borderRadius:"2px",height:"100%",transition:"box-shadow 0.2s,transform 0.2s",cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(26,26,24,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ width:28,height:28,marginBottom:"1rem",display:"flex",alignItems:"center",justifyContent:"center" }}>{icons[icon]}</div>
                <h4 style={{ fontSize:"0.88rem",fontWeight:500,marginBottom:"0.75rem",letterSpacing:"0.01em" }}>{title}</h4>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"0.4rem" }}>
                  {tags.map(t => <span key={t} style={tag}>{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"6rem 2.5rem",background:"var(--ink)",color:"var(--cream)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FadeIn>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:"2rem",flexWrap:"wrap",marginBottom:"3.5rem" }}>
            <div>
              <p style={{ fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"#8AA4F0",marginBottom:"1rem" }}>Selected Work</p>
              <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.1,color:"var(--cream)",marginBottom:"1rem" }}>Projects that<br/>moved the needle.</h2>
            </div>
            <p style={{ fontSize:"1rem",color:"rgba(250,248,244,0.5)",maxWidth:480 }}>Real outcomes from real products — performance wins, design systems, and conversion experiments.</p>
          </div>
        </FadeIn>
        <div className="projects-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1px",border:"1px solid rgba(250,248,244,0.08)" }}>
          {PROJECTS.map(({ company, title, desc, stat, statLabel, tags }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div style={{ padding:"2rem",background:"rgba(255,255,255,0.03)",display:"flex",flexDirection:"column",gap:"1rem",height:"100%",transition:"background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
              >
                <div>
                  <div style={{ fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(250,248,244,0.35)",marginBottom:"0.35rem" }}>{company}</div>
                  <div style={{ fontFamily:"var(--serif)",fontSize:"1.25rem",color:"var(--cream)",lineHeight:1.2 }}>{title}</div>
                </div>
                <p style={{ fontSize:"0.88rem",color:"rgba(250,248,244,0.6)",lineHeight:1.7,flex:1 }}>{desc}</p>
                <div>
                  <span style={{ fontFamily:"var(--serif)",fontSize:"1.6rem",color:"#8AA4F0" }}>{stat}</span>
                  <span style={{ fontSize:"0.72rem",color:"rgba(250,248,244,0.4)",marginLeft:"0.25rem" }}>{statLabel}</span>
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"0.4rem" }}>
                  {tags.map(t => <span key={t} style={{ fontSize:"0.68rem",padding:"0.2rem 0.55rem",border:"1px solid rgba(250,248,244,0.14)",borderRadius:"2px",color:"rgba(250,248,244,0.5)" }}>{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding:"6rem 2.5rem",borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:700,margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem" }}>Experience</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(2rem,4vw,3rem)",lineHeight:1.1,marginBottom:"3rem" }}>Timeline.</h2>
        </FadeIn>
        {EXPERIENCE.map(({ dates, role, company, bullets }, i) => (
          <FadeIn key={company} delay={i * 0.1}>
            <div className="exp-item" style={{ display:"grid",gridTemplateColumns:"120px 1fr",gap:"2rem",padding:"2rem 0",borderBottom:"1px solid var(--border)" }}>
              <div style={{ fontSize:"0.75rem",color:"var(--ink-muted)",letterSpacing:"0.03em",paddingTop:"0.35rem",lineHeight:1.6 }}>{dates}</div>
              <div>
                <div style={{ fontSize:"0.75rem",fontWeight:500,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.3rem" }}>{role}</div>
                <div style={{ fontFamily:"var(--serif)",fontSize:"1.2rem",marginBottom:"0.75rem" }}>{company}</div>
                <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                  {bullets.map(b => (
                    <li key={b} style={{ fontSize:"0.88rem",color:"var(--ink-muted)",lineHeight:1.65,paddingLeft:"1rem",position:"relative" }}>
                      <span style={{ position:"absolute",left:0,top:"0.55rem",width:4,height:1,background:"var(--accent)",display:"block" }}/>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
        <FadeIn delay={0.3}>
          <div className="exp-item" style={{ display:"grid",gridTemplateColumns:"120px 1fr",gap:"2rem",padding:"2rem 0" }}>
            <div style={{ fontSize:"0.75rem",color:"var(--ink-muted)",paddingTop:"0.35rem" }}>Education</div>
            <div>
              <div style={{ fontSize:"0.75rem",fontWeight:500,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.3rem" }}>B.A. English</div>
              <div style={{ fontFamily:"var(--serif)",fontSize:"1.2rem" }}>University of Maryland, College Park</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const links = [
    { icon:"linkedin", label:"linkedin.com/in/keribienert", href:"https://linkedin.com/in/keribienert" },
    { icon:"mail",     label:"keri.bienert@gmail.com",       href:"keri.bienert@gmail.com" },
    { icon:"pin",      label:"San Diego, CA — remote friendly", href:null },
  ];
  return (
    <section id="contact" style={{ padding:"6rem 2.5rem",background:"var(--accent-bg)",borderTop:"1px solid var(--accent-bg-deep)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"2rem" }}>
        <FadeIn>
          <p style={{ fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem" }}>Contact</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(1.6rem,3vw,2.5rem)",lineHeight:1.1,marginBottom:"1rem" }}>Let's build<br/>something great.</h2>
          <p style={{ fontSize:"1rem",color:"#4A5E9A",maxWidth:480 }}>Open to full-time and contract roles blending UX design and frontend development.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display:"flex",flexDirection:"column",gap:"0.75rem" }}>
            {links.map(({ icon, label, href }) => {
              const inner = (
                <div style={{ display:"flex",alignItems:"center",gap:"0.9rem",fontSize:"0.9rem",color:"var(--ink)",padding:"0.85rem 1.25rem",background:"#fff",border:"1px solid var(--accent-bg-deep)",borderRadius:"2px",transition:"transform 0.15s,box-shadow 0.15s",cursor:href?"pointer":"default" }}
                  onMouseEnter={e => { if(href){ e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(43,92,230,0.1)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="none"; }}
                >
                  <div style={{ width:28,height:28,background:"var(--accent-bg)",borderRadius:"2px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    {icons[icon]}
                  </div>
                  <span>{label}</span>
                </div>
              );
              return href
                ? <a key={label} href={href} style={{ textDecoration:"none" }}>{inner}</a>
                : <div key={label}>{inner}</div>;
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function KeriBienertPortfolio() {
  const [darkNav, setDarkNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("projects");
      if (el) {
        const { top, bottom } = el.getBoundingClientRect();
        setDarkNav(top <= 0 && bottom > 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Nav dark={darkNav} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer style={{ textAlign:"center",padding:"2rem",fontSize:"0.75rem",color:"var(--ink-muted)",borderTop:"1px solid var(--border)",letterSpacing:"0.04em" }}>
        © 2026 Keri Bienert · Frontend Developer & UX Engineer
      </footer>
    </>
  );
}
