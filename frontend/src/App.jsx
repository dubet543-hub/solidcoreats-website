import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Reveal, { CountUp } from './components/Reveal';
import ContactForm from './components/ContactForm';
import {
  HeroVisual,
  ACWRGauge,
  LoadSplit,
  WellnessRadar,
  DualInterface,
  ExportArt,
  AppleBadge,
  PlayBadge,
} from './components/art';
import { getFeatures } from './api';
import { SUPPORT_EMAIL, SITE_URL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from './constants';
import './App.css';

const NAV = [
  ['product', 'Product'],
  ['intelligence', 'Intelligence'],
  ['hub', 'The Hub'],
  ['app', 'Get the App'],
  ['promoter', 'Promoter'],
  ['contact', 'Contact'],
];

/**
 * Team credits. Copy here is role-scoped only — no biographical claims are
 * invented. Replace `bio`/`tags` with details supplied by each person.
 */
const TEAM = [
  {
    name: 'Tushar Dube',
    initials: 'TD',
    role: 'Chief Technical Officer',
    bio: 'Leads technology and engineering for SOLIDCORE AMS — the athlete mobile app across iOS and Android, the admin dashboard used by coaches and support staff, and the data platform behind them.',
    tags: ['Platform Architecture', 'Athlete App (iOS & Android)', 'Admin Dashboard'],
  },
];

/* Each capability is paired with the artwork that shows it in action. */
const ART = {
  'workload-acwr': ACWRGauge,
  'skill-specific-load': LoadSplit,
  'wellness-audits': WellnessRadar,
  'data-export': ExportArt,
};

function ScrollSpine() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div className="spine" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

export default function App() {
  const [features, setFeatures] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getFeatures()
      .then((d) => setFeatures(d.features))
      .catch((e) => setErr(e.message));
  }, []);

  const cat = (c) => features.filter((f) => f.category === c);
  const capabilities = cat('capability');
  const featured = capabilities.filter((f) => ART[f.key]);
  const rest = capabilities.filter((f) => !ART[f.key]);

  return (
    <>
      <ScrollSpine />

      <header className="hdr">
        <a href="#top" className="hdr-brand">
          <Logo size={34} animated />
        </a>
        <nav className="hdr-nav">
          {NAV.map(([id, l]) => (
            <a key={id} href={`#${id}`}>
              {l}
            </a>
          ))}
        </nav>
        <a className="btn btn--sm" href="#contact">
          Request Access
        </a>
      </header>

      <main id="top">
        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">
          <div className="aurora" aria-hidden="true">
            <span className="aurora-a" />
            <span className="aurora-b" />
          </div>

          <div className="hero-grid shell">
            <div className="hero-copy">
              <Reveal as="span" className="tag">
                <i className="tag-dot" /> Sports Tech · Athlete Training Seminary
              </Reveal>

              <Reveal as="h1" className="hero-h1" delay={80}>
                Train to the
                <em className="hero-em"> edge</em>,<br />
                never over it.
              </Reveal>

              <Reveal as="p" className="hero-lede" delay={160}>
                SOLIDCORE ATS turns daily athlete self-reporting into precise load management —
                balancing fatigue, sharpening recovery and protecting long-term durability.
              </Reveal>

              <Reveal className="hero-actions" delay={240}>
                <a className="btn" href="#product">
                  Explore Solidcore AMS
                </a>
                <a className="btn btn--ghost" href="#app">
                  Get the App
                </a>
              </Reveal>

              <Reveal className="hero-stats" delay={320}>
                {[
                  ['Data-Driven', 100, '%'],
                  ['Manual Input Method', 100, '%'],
                  ['Years of Field Research', 2, ''],
                ].map(([l, v, s]) => (
                  <div className="stat" key={l}>
                    <b>
                      <CountUp value={v} suffix={s} />
                    </b>
                    <span>{l}</span>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal className="hero-art" variant="scale" delay={200}>
              <HeroVisual />
            </Reveal>
          </div>

          <div className="ticker" aria-hidden="true">
            <div className="ticker-run">
              {Array.from({ length: 2 }).map((_, i) => (
                <span key={i}>
                  ACWR TRACKING <i>◆</i> SESSION RPE <i>◆</i> WELLNESS AUDITS <i>◆</i> INJURY RISK
                  MITIGATION <i>◆</i> RECOVERY SCORES <i>◆</i> LONG-TERM ATHLETIC DEVELOPMENT{' '}
                  <i>◆</i>{' '}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MISSION ═══════════ */}
        <section className="shell band">
          <Reveal className="mission">
            <p>
              We combine <mark>evidence based physical preparation</mark>, workload management and
              injury risk mitigation to help athletes achieve peak athletic output and long-term
              durability — through athlete education.
            </p>
          </Reveal>

          <div className="pillars">
            {cat('pillar').map((f, i) => (
              <Reveal className="pillar" key={f.key} delay={i * 110}>
                <span className="pillar-idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <i className="pillar-rule" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════ PRODUCT ═══════════ */}
        <section className="shell sect" id="product">
          <Reveal className="sect-head">
            <span className="kicker">01 — Flagship App</span>
            <h2>
              Solidcore <em>AMS</em>
            </h2>
            <p className="sect-lede">
              The Athlete Monitoring System: an integrated performance analytics platform giving
              coaches and clinicians real-time data on every athlete, every day.
            </p>
          </Reveal>

          <div className="split">
            <Reveal className="split-art" variant="left">
              <DualInterface />
            </Reveal>
            <div className="split-copy">
              {cat('ecosystem').map((f, i) => (
                <Reveal className="line-item" key={f.key} delay={i * 100} variant="right">
                  <h4>{f.title}</h4>
                  <p>{f.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ INTELLIGENCE ═══════════ */}
        <section className="shell sect" id="intelligence">
          <Reveal className="sect-head">
            <span className="kicker">02 — Platform Capabilities</span>
            <h2>Performance intelligence, not guesswork</h2>
          </Reveal>

          {err && <p className="note note--err">Could not load capabilities: {err}</p>}

          <div className="feats">
            {featured.map((f, i) => {
              const Art = ART[f.key];
              return (
                <Reveal className="feat" key={f.key} delay={i * 90}>
                  <div className="feat-art">
                    <Art />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="minis">
            {rest.map((f, i) => (
              <Reveal className="mini" key={f.key} delay={i * 80}>
                <i className="mini-mark" />
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════ VALUE ═══════════ */}
        <section className="shell sect" id="hub">
          <Reveal className="sect-head">
            <span className="kicker">03 — Value Proposition</span>
            <h2>What it changes on the ground</h2>
          </Reveal>
          <div className="values">
            {cat('value').map((f, i) => (
              <Reveal className="value" key={f.key} delay={i * 120} variant="scale">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════ APP / STORES ═══════════ */}
        <section className="shell sect" id="app">
          <Reveal className="appcta">
            <div className="appcta-copy">
              <span className="kicker">04 — Athlete App</span>
              <h2>
                Solidcore AMS is <em>coming soon</em> to mobile
              </h2>
              <p>
                Cross-platform accessibility across iOS and Android, so athletes log sessions and
                wellness in seconds — and staff see it instantly.
              </p>

              <div className="stores">
                <a className="store" aria-label="App Store — coming soon">
                  <AppleBadge />
                </a>
                <a className="store" aria-label="Google Play — coming soon">
                  <PlayBadge />
                </a>
              </div>
              <p className="stores-note">
                <i className="soon-dot" /> Launching soon — request early access and we'll notify
                you first.
              </p>
            </div>
            <Reveal className="appcta-art" variant="scale" delay={140}>
              <Logo size={150} lockup />
            </Reveal>
          </Reveal>
        </section>

        {/* ═══════════ PROMOTER ═══════════ */}
        <section className="shell sect" id="promoter">
          <Reveal className="sect-head">
            <span className="kicker">05 — About the Promoter</span>
            <h2>Built by a practitioner</h2>
          </Reveal>

          <Reveal className="promo">
            <aside className="promo-side">
              <div className="promo-av">VM</div>
              <h3>Dr. Vinay Manwatkar (PT)</h3>
              <p className="promo-role">Founder &amp; Product Architect</p>
              <ul className="promo-facts">
                <li>
                  <b>10+</b> years in athlete workload &amp; wellness monitoring
                </li>
                <li>
                  <b>VCA</b> Vidarbha Cricket Association, Nagpur
                </li>
                <li>
                  <b>2 yrs</b> field research with fast bowlers
                </li>
              </ul>
            </aside>
            <div className="promo-body">
              <p>
                Dr. Vinay Manwatkar brings over a decade of expertise in athlete workload and
                wellness monitoring. As a Physiotherapist, he previously served at the Vidarbha
                Cricket Association in Nagpur, designing rehabilitation and high-performance
                training protocols for junior as well as elite athletes.
              </p>
              <p>
                Driven by a firm belief in empowering athletes through education — focusing on
                self-awareness, long-term athletic development and the physical demands of elite
                sport — he founded SOLIDCORE AMS. Two years of targeted field research with fast
                bowlers led him to conceptualize and design the core framework for the SOLIDCORE
                application.
              </p>
              <p>
                At SOLIDCORE AMS he spearheads vision, product innovation and operations, advancing
                the company's mission to help athletes achieve peak performance and sustainable
                wellness through intelligent monitoring and education.
              </p>
            </div>
          </Reveal>

          <Reveal className="team" delay={120}>
            {TEAM.map((m, i) => (
              <article className="member" key={m.name}>
                <span className="member-av">{m.initials}</span>
                <div className="member-body">
                  <h4>{m.name}</h4>
                  <p className="member-role">{m.role}</p>
                  <p className="member-bio">{m.bio}</p>
                  <ul className="member-tags">
                    {m.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section className="shell sect" id="contact">
          <Reveal className="sect-head">
            <span className="kicker">06 — Explore the Ecosystem</span>
            <h2>Power your training with SOLIDCORE</h2>
            <p className="sect-lede">
              Tell us about your squad and we'll get you set up — or reach us directly.
            </p>
          </Reveal>

          <Reveal className="reach" delay={60}>
            <a className="reach-item" href={`mailto:${SUPPORT_EMAIL}`}>
              <span className="reach-label">Email</span>
              <span className="reach-value">{SUPPORT_EMAIL}</span>
            </a>
            <a className="reach-item" href={`tel:${CONTACT_PHONE}`}>
              <span className="reach-label">Phone · Dr. Vinay Manwatkar</span>
              <span className="reach-value">{CONTACT_PHONE_DISPLAY}</span>
            </a>
          </Reveal>

          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </section>
      </main>

      <footer className="ftr">
        <div className="shell ftr-grid">
          <div className="ftr-brand">
            <Logo size={40} animated />
            <p>
              Elite sports science and performance — empowering athletes, coaches and sports
              institutions.
            </p>
            <div className="ftr-stores">
              <span className="store store--sm">
                <AppleBadge />
              </span>
              <span className="store store--sm">
                <PlayBadge />
              </span>
            </div>
          </div>

          <div className="ftr-col">
            <h5>Explore</h5>
            {NAV.map(([id, l]) => (
              <a key={id} href={`#${id}`}>
                {l}
              </a>
            ))}
          </div>

          <div className="ftr-col">
            <h5>Contact</h5>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={SITE_URL} target="_blank" rel="noreferrer">
              www.solidcoreats.com
            </a>
            <span className="ftr-muted">Nagpur, India</span>
          </div>
        </div>

        <div className="shell ftr-base">
          <span>© {new Date().getFullYear()} SOLIDCORE ATS · Athlete Training Seminary</span>
          <span>Sports Tech · Built for athletes and coaches</span>
        </div>
      </footer>
    </>
  );
}
