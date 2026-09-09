/**
 * App screenshots. These are real captures of the SOLIDCORE ATS app —
 * no illustrated/generated stand-ins — cropped to their top, most
 * relevant portion via object-fit inside each card frame.
 */
function Screenshot({ src, alt, tall = false }) {
  return (
    <img
      className={`art art-shot ${tall ? 'art-shot--tall' : 'art-shot--wide'}`}
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
}

/* ---------- hero: real app home screen ---------- */
export function HeroVisual() {
  return (
    <Screenshot
      src="/screens/home-overview.jpg"
      alt="Solidcore ATS home screen showing Performance, Recovery and Today rings"
      tall
    />
  );
}

/* ---------- ACWR / workload ---------- */
export function ACWRGauge() {
  return (
    <Screenshot
      src="/screens/today-acwr.jpg"
      alt="Today screen with Training, Skill and Total ACWR gauges in the Sweet Spot"
    />
  );
}

/* ---------- skill vs physical load split ---------- */
export function LoadSplit() {
  return (
    <Screenshot
      src="/screens/training-skill-split.jpg"
      alt="Training and Skill load tracked separately with their own ACWR values"
    />
  );
}

/* ---------- wellness radar ---------- */
export function WellnessRadar() {
  return (
    <Screenshot
      src="/screens/wellness-audit.jpg"
      alt="Daily wellness check-in scores for wellness, muscle soreness and fatigue"
    />
  );
}

/* ---------- dual interface hub ---------- */
export function DualInterface() {
  return (
    <Screenshot
      src="/screens/readiness-score.jpg"
      alt="Readiness score and cumulative recovery score from the athlete app"
    />
  );
}

/* ---------- export / integration ---------- */
export function ExportArt() {
  return (
    <Screenshot
      src="/screens/sleep-summary.jpg"
      alt="Sleep summary and sleep quality data logged in the athlete app"
    />
  );
}

/* ---------- store badges ---------- */
export function AppleBadge() {
  return (
    <svg viewBox="0 0 160 52" className="store-badge" role="img" aria-label="Coming soon on the App Store">
      <rect x="0.6" y="0.6" width="158.8" height="50.8" rx="10" fill="#080f16" stroke="#2b3f4f" />
      <path
        d="M31.6 27.9c0-3.1 2.5-4.6 2.6-4.7-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3.1-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3.1 1.5-.1 2.1-1 3.9-1s2.4 1 4 1c1.7 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.4 1.7-3.5-.1 0-3.2-1.3-3.2-4.9zM28.7 18.9c.8-1 1.4-2.4 1.2-3.9-1.2.1-2.7.8-3.6 1.8-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.7-1.7z"
        fill="#e8eff6"
      />
      <text x="48" y="22" fill="#8798a9" fontSize="8.5" fontFamily="Inter, sans-serif" letterSpacing="0.6">
        Coming soon on the
      </text>
      <text x="48" y="38" fill="#e8eff6" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        App Store
      </text>
    </svg>
  );
}

export function PlayBadge() {
  return (
    <svg viewBox="0 0 160 52" className="store-badge" role="img" aria-label="Coming soon on Google Play">
      <rect x="0.6" y="0.6" width="158.8" height="50.8" rx="10" fill="#080f16" stroke="#2b3f4f" />
      <g transform="translate(16 13) scale(1.08)">
        <path d="M0.6 0.4a1.7 1.7 0 0 0-.6 1.3v20.6c0 .5.2 1 .6 1.3l11.5-11.6z" fill="#00d0ff" />
        <path d="M16.3 7.6L12.1 12 .6.4A1.5 1.5 0 0 1 2.3.2z" fill="#00f076" />
        <path d="M20.4 10.9c.8.4.8 1.6 0 2.1l-4.1 2.3-4.2-4.3 4.2-4.4z" fill="#ffc900" />
        <path d="M16.3 16.4L2.3 23.8a1.5 1.5 0 0 1-1.7-.2L12.1 12z" fill="#ff3a44" />
      </g>
      <text x="48" y="22" fill="#8798a9" fontSize="8.5" fontFamily="Inter, sans-serif" letterSpacing="0.6">
        Coming soon on
      </text>
      <text x="48" y="38" fill="#e8eff6" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        Google Play
      </text>
    </svg>
  );
}
