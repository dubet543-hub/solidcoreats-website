import { useState } from 'react';

/**
 * Brand mark.
 *
 * Two assets, both cut out of the supplied artwork with transparent
 * backgrounds (see scripts note in README):
 *   /logo-mark.png  infinity mark on its own
 *   /logo.png       full lockup, mark above the SOLIDCORE AMS wordmark
 *
 * At small sizes the mark is paired with live text rather than the baked-in
 * wordmark, which would be only a few pixels tall and unreadable.
 */
const MARK = '/logo-mark.png';
const LOCKUP = '/logo.png';

const LEMNISCATE =
  'M155 100c-26-40-50-60-83-60-33 0-57 26-57 60s24 60 57 60c33 0 57-20 83-60 ' +
  '26-40 50-60 83-60 33 0 57 26 57 60s-24 60-57 60c-33 0-57-20-83-60Z';

/** Vector stand-in, used only if the PNGs are missing. */
export function InfinityMark({ size = 64, animated = true, id = 'm' }) {
  return (
    <svg
      width={size * 1.55}
      height={size}
      viewBox="0 0 310 200"
      fill="none"
      className="mark"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f7fb" />
          <stop offset="16%" stopColor="#a8bccd" />
          <stop offset="34%" stopColor="#46596b" />
          <stop offset="52%" stopColor="#18242f" />
          <stop offset="68%" stopColor="#3f5568" />
          <stop offset="84%" stopColor="#9fb4c6" />
          <stop offset="100%" stopColor="#e4edf5" />
        </linearGradient>
        <linearGradient id={`${id}-core`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a1a25" />
          <stop offset="30%" stopColor="#17627d" />
          <stop offset="52%" stopColor="#4fd6e8" />
          <stop offset="74%" stopColor="#17627d" />
          <stop offset="100%" stopColor="#0a1a25" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={LEMNISCATE} stroke="#000" strokeWidth="26" opacity="0.5" transform="translate(0 5)" />
      <path d={LEMNISCATE} stroke={`url(#${id}-body)`} strokeWidth="23" strokeLinecap="round" />
      <path d={LEMNISCATE} stroke="#0b141c" strokeWidth="11" opacity="0.55" />
      <path d={LEMNISCATE} stroke={`url(#${id}-core)`} strokeWidth="6.5" filter={`url(#${id}-glow)`} />
      <path
        d={LEMNISCATE}
        stroke="#f6fafd"
        strokeWidth="1.8"
        opacity="0.5"
        transform="translate(0 -7)"
        strokeLinecap="round"
      />
      {animated && (
        <path className="mark-spark" d={LEMNISCATE} stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function Logo({
  size = 40,
  wordmark = true,
  lockup = false,
  animated = false,
  className = '',
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <span className={`logo ${className}`} aria-label="SOLIDCORE AMS">
        <InfinityMark size={size} animated={animated} id={`lg${size}`} />
        {wordmark && !lockup && (
          <span className="logo-word">
            SOLIDCORE<span className="logo-word-accent">AMS</span>
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`logo ${className}`}>
      <img
        src={lockup ? LOCKUP : MARK}
        alt="SOLIDCORE AMS"
        style={{ height: size, width: 'auto' }}
        onError={() => setMissing(true)}
      />
      {wordmark && !lockup && (
        <span className="logo-word" aria-hidden="true">
          SOLIDCORE<span className="logo-word-accent">AMS</span>
        </span>
      )}
    </span>
  );
}
