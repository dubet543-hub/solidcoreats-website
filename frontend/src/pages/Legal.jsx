import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { LEGAL_EFFECTIVE, LEGAL_OPERATOR } from '../legal/content';
import { SUPPORT_EMAIL } from '../constants';

/** Shared shell for the Terms and Privacy pages. */
export default function Legal({ title, intro, sections, docTitle }) {
  useEffect(() => {
    document.title = `${docTitle} · SOLIDCORE ATS`;
    window.scrollTo(0, 0);
  }, [docTitle]);

  return (
    <div className="legal">
      <header className="legal-bar">
        <Link to="/" className="legal-back" aria-label="Back to home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="legal-bar-title">{title}</span>
        <Link to="/" className="legal-bar-logo" aria-label="SOLIDCORE AMS home">
          <Logo size={26} wordmark={false} />
        </Link>
      </header>

      <main className="legal-body">
        <p className="legal-eff">Effective {LEGAL_EFFECTIVE}</p>
        <h1>{title}</h1>
        {intro && <p className="legal-intro">{intro}</p>}

        <ol className="legal-list">
          {sections.map((s, i) => (
            <li key={s.title} className={s.highlight ? 'legal-sec legal-sec--flag' : 'legal-sec'}>
              <h2>
                <span className="legal-num">{i + 1}.</span> {s.title}
              </h2>
              {s.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </li>
          ))}
        </ol>

        <div className="legal-foot">
          <p>
            Questions? Contact{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="ln">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <nav className="legal-links">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/">Back to site</Link>
          </nav>
          <p className="legal-copy">
            © {new Date().getFullYear()} {LEGAL_OPERATOR}
          </p>
        </div>
      </main>
    </div>
  );
}
