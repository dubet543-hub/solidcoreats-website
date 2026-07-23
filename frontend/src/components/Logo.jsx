import { useState } from 'react';

// The official artwork, once dropped at frontend/public/logo.png, wins.
// Until then the layered vector below stands in for it.
const OFFICIAL = '/logo.png';

const LEMNISCATE =
  'M155 100c-26-40-50-60-83-60-33 0-57 26-57 60s24 60 57 60c33 0 57-20 83-60 ' +
  '26-40 50-60 83-60 33 0 57 26 57 60s-24 60-57 60c-33 0-57-20-83-60Z';

/**
 * Layered ribbon build-up: gunmetal body → chrome edge → teal core →
 * a light that travels the loop, mirroring the metallic AMS mark.
 */
export function InfinityMark({ size = 64, animated = true, id = 'm' }) {
  return (
    <svg
      width={size * 1.55}
      height={size}
      viewBox="0 0 310 200"
      fill="none"
      className={`mark ${animated ? 'mark--live' : ''}`}
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

      {/* depth shadow under the ribbon */}
      <path d={LEMNISCATE} stroke="#000" strokeWidth="26" opacity="0.5" transform="translate(0 5)" />
      {/* gunmetal body */}
      <path d={LEMNISCATE} stroke={`url(#${id}-body)`} strokeWidth="23" strokeLinecap="round" />
      {/* inner shadow groove */}
      <path d={LEMNISCATE} stroke="#0b141c" strokeWidth="11" opacity="0.55" />
      {/* teal core light */}
      <path
        d={LEMNISCATE}
        stroke={`url(#${id}-core)`}
        strokeWidth="6.5"
        filter={`url(#${id}-glow)`}
      />
      {/* chrome top edge */}
      <path
        d={LEMNISCATE}
        stroke="#f6fafd"
        strokeWidth="1.8"
        opacity="0.5"
        transform="translate(0 -7)"
        strokeLinecap="round"
      />
      {/* travelling specular */}
      {animated && (
        <path
          className="mark-spark"
          d={LEMNISCATE}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Logo({ size = 40, wordmark = true, animated = false, className = '' }) {
  const [official, setOfficial] = useState(true);

  return (
    <span className={`logo ${className}`} aria-label="SOLIDCORE AMS">
      {official ? (
        <img
          src={OFFICIAL}
          alt="SOLIDCORE AMS"
          style={{ height: size, width: 'auto' }}
          onError={() => setOfficial(false)}
        />
      ) : (
        <InfinityMark size={size} animated={animated} id={`lg${size}`} />
      )}
      {wordmark && (
        <span className="logo-word">
          SOLIDCORE<span className="logo-word-accent">AMS</span>
        </span>
      )}
    </span>
  );
}
