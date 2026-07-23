/**
 * Content-specific artwork. Every piece here draws real SOLIDCORE AMS
 * subject matter — ACWR ratios, session RPE, wellness check-ins, the
 * dual-interface hub — rather than decorative filler.
 */

/* ---------- hero: athlete app + live data orbiting it ---------- */
export function HeroVisual() {
  return (
    <svg viewBox="0 0 520 520" className="art art-hero" role="img" aria-label="Solidcore AMS athlete app with live workload data">
      <defs>
        <linearGradient id="h-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12202c" />
          <stop offset="100%" stopColor="#080f16" />
        </linearGradient>
        <linearGradient id="h-phone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8ea3b6" />
          <stop offset="45%" stopColor="#2c3d4d" />
          <stop offset="100%" stopColor="#7d93a7" />
        </linearGradient>
        <linearGradient id="h-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1d8ba6" />
          <stop offset="100%" stopColor="#4fd6e8" />
        </linearGradient>
        <radialGradient id="h-halo">
          <stop offset="0%" stopColor="#4fd6e8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4fd6e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="260" r="215" fill="url(#h-halo)" />

      {/* orbit rings */}
      <g className="art-orbit" style={{ transformOrigin: '260px 260px' }}>
        <circle cx="260" cy="260" r="205" fill="none" stroke="#1c2833" strokeWidth="1" strokeDasharray="4 9" />
        <circle cx="260" cy="260" r="168" fill="none" stroke="#1c2833" strokeWidth="1" />
        <circle cx="260" cy="55" r="5" fill="#4fd6e8" />
        <circle cx="428" cy="260" r="4" fill="#9dafc0" />
        <circle cx="260" cy="465" r="4" fill="#f0b429" />
      </g>

      {/* phone */}
      <g className="art-float">
        <rect x="185" y="105" width="150" height="300" rx="26" fill="url(#h-phone)" />
        <rect x="191" y="111" width="138" height="288" rx="21" fill="url(#h-screen)" />
        <rect x="240" y="118" width="40" height="6" rx="3" fill="#0b141c" />

        {/* app header */}
        <text x="205" y="150" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1.5">
          TODAY
        </text>
        <text x="205" y="170" fill="#e8eff6" fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">
          Session Load
        </text>

        {/* RPE bars */}
        <g>
          {[
            [206, 46, 0],
            [223, 62, 0.12],
            [240, 34, 0.24],
            [257, 72, 0.36],
            [274, 55, 0.48],
            [291, 80, 0.6],
            [308, 40, 0.72],
          ].map(([x, h, d]) => (
            <rect
              key={x}
              className="art-bar"
              x={x}
              y={268 - h}
              width="10"
              height={h}
              rx="3"
              fill="url(#h-bar)"
              style={{ animationDelay: `${d}s`, transformOrigin: `${x}px 268px` }}
            />
          ))}
        </g>
        <line x1="200" y1="272" x2="322" y2="272" stroke="#1c2833" strokeWidth="1" />

        {/* readiness pill */}
        <rect x="205" y="292" width="112" height="40" rx="10" fill="#0f1922" stroke="#1c2833" />
        <circle cx="222" cy="312" r="8" fill="none" stroke="#22303d" strokeWidth="3" />
        <circle
          className="art-ring"
          cx="222"
          cy="312"
          r="8"
          fill="none"
          stroke="#4fd6e8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="50"
          strokeDashoffset="12"
          transform="rotate(-90 222 312)"
        />
        <text x="238" y="309" fill="#9dafc0" fontSize="8" fontFamily="Inter, sans-serif">
          READINESS
        </text>
        <text x="238" y="322" fill="#4fd6e8" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">
          76%
        </text>

        <rect x="205" y="342" width="112" height="30" rx="9" fill="#4fd6e8" />
        <text x="228" y="362" fill="#04070a" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
          Log Session
        </text>
      </g>

      {/* floating data chips */}
      <g className="art-float art-float--slow">
        <rect x="42" y="150" width="126" height="58" rx="13" fill="#0d141c" stroke="#1c2833" />
        <text x="58" y="173" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1">
          ACWR
        </text>
        <text x="58" y="194" fill="#4fd6e8" fontSize="19" fontWeight="800" fontFamily="Inter, sans-serif">
          1.12
        </text>
        <text x="112" y="194" fill="#7fdc6b" fontSize="9" fontFamily="Inter, sans-serif">
          OPTIMAL
        </text>
      </g>

      <g className="art-float art-float--delay">
        <rect x="352" y="318" width="132" height="58" rx="13" fill="#0d141c" stroke="#1c2833" />
        <text x="368" y="341" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1">
          SLEEP QUALITY
        </text>
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={368 + i * 15} y={352} width="11" height="11" rx="2.5" fill={i < 4 ? '#4fd6e8' : '#22303d'} />
          ))}
        </g>
      </g>

      <g className="art-float art-float--slow">
        <rect x="356" y="132" width="118" height="52" rx="13" fill="#0d141c" stroke="#1c2833" />
        <text x="372" y="154" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1">
          FATIGUE
        </text>
        <rect x="372" y="162" width="86" height="6" rx="3" fill="#22303d" />
        <rect className="art-fill" x="372" y="162" width="34" height="6" rx="3" fill="#f0b429" />
      </g>
    </svg>
  );
}

/* ---------- ACWR sweep gauge ---------- */
export function ACWRGauge() {
  return (
    <svg viewBox="0 0 260 165" className="art" role="img" aria-label="Acute to chronic workload ratio gauge in the optimal zone">
      <defs>
        <linearGradient id="g-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4fd6e8" />
          <stop offset="60%" stopColor="#7fdc6b" />
          <stop offset="100%" stopColor="#f0b429" />
        </linearGradient>
      </defs>
      <path d="M30 140a100 100 0 0 1 200 0" fill="none" stroke="#16212c" strokeWidth="17" strokeLinecap="round" />
      <path
        className="art-sweep"
        d="M30 140a100 100 0 0 1 200 0"
        fill="none"
        stroke="url(#g-sweep)"
        strokeWidth="17"
        strokeLinecap="round"
        strokeDasharray="314"
        strokeDashoffset="126"
      />
      <g className="art-needle" style={{ transformOrigin: '130px 140px' }}>
        <line x1="130" y1="140" x2="130" y2="62" stroke="#e8eff6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="140" r="8" fill="#e8eff6" />
        <circle cx="130" cy="140" r="3.5" fill="#0d141c" />
      </g>
      <text x="130" y="112" textAnchor="middle" fill="#4fd6e8" fontSize="27" fontWeight="800" fontFamily="Inter, sans-serif">
        1.12
      </text>
      <text x="30" y="160" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif">
        0.8 UNDER
      </text>
      <text x="196" y="160" fill="#6d7f91" fontSize="9" fontFamily="Inter, sans-serif">
        1.5 SPIKE
      </text>
    </svg>
  );
}

/* ---------- skill vs physical load split ---------- */
export function LoadSplit() {
  const rows = [
    ['Bowling', 78, '#4fd6e8'],
    ['Batting', 54, '#7fdc6b'],
    ['Fielding', 36, '#9dafc0'],
    ['S & C', 62, '#f0b429'],
  ];
  return (
    <svg viewBox="0 0 260 165" className="art" role="img" aria-label="Cricket skill loads tracked separately from strength and conditioning">
      {rows.map(([label, w, c], i) => (
        <g key={label} transform={`translate(0 ${i * 38 + 16})`}>
          <text x="0" y="10" fill="#8798a9" fontSize="10" fontFamily="Inter, sans-serif">
            {label}
          </text>
          <rect x="0" y="18" width="260" height="9" rx="4.5" fill="#16212c" />
          <rect
            className="art-fill"
            x="0"
            y="18"
            width={(w / 100) * 260}
            height="9"
            rx="4.5"
            fill={c}
            style={{ animationDelay: `${i * 0.13}s` }}
          />
          <text x="240" y="10" fill={c} fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="end">
            {w}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- wellness radar ---------- */
export function WellnessRadar() {
  const axes = ['Sleep', 'Fatigue', 'Soreness', 'Stress', 'Mood'];
  const vals = [0.86, 0.62, 0.55, 0.78, 0.9];
  const cx = 130;
  const cy = 88;
  const R = 62;

  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return [cx + Math.cos(a) * R * r, cy + Math.sin(a) * R * r];
  };

  const web = [0.25, 0.5, 0.75, 1]
    .map((r) => axes.map((_, i) => pt(i, r).join(',')).join(' '))
    .map((points, i) => <polygon key={i} points={points} fill="none" stroke="#1c2833" strokeWidth="1" />);

  const shape = axes.map((_, i) => pt(i, vals[i]).join(',')).join(' ');

  return (
    <svg viewBox="0 0 260 165" className="art" role="img" aria-label="Daily wellness check-in radar across sleep, fatigue, soreness, stress and mood">
      {web}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#1c2833" strokeWidth="1" />;
      })}
      <polygon className="art-pop" points={shape} fill="rgba(79,214,232,0.22)" stroke="#4fd6e8" strokeWidth="2" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1.3);
        return (
          <text key={a} x={x} y={y} fill="#6d7f91" fontSize="8.5" textAnchor="middle" fontFamily="Inter, sans-serif">
            {a}
          </text>
        );
      })}
      {axes.map((_, i) => {
        const [x, y] = pt(i, vals[i]);
        return <circle key={i} cx={x} cy={y} r="3" fill="#4fd6e8" />;
      })}
    </svg>
  );
}

/* ---------- dual interface hub ---------- */
export function DualInterface() {
  return (
    <svg viewBox="0 0 420 240" className="art" role="img" aria-label="Athlete mobile app and admin web dashboard sharing one data hub">
      <defs>
        <linearGradient id="d-scr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12202c" />
          <stop offset="100%" stopColor="#080f16" />
        </linearGradient>
      </defs>

      {/* dashboard */}
      <rect x="150" y="34" width="240" height="152" rx="12" fill="#2c3d4d" />
      <rect x="156" y="40" width="228" height="140" rx="8" fill="url(#d-scr)" />
      <rect x="150" y="192" width="240" height="7" rx="3.5" fill="#2c3d4d" />
      <rect x="240" y="199" width="60" height="6" rx="3" fill="#22303d" />

      <text x="168" y="60" fill="#6d7f91" fontSize="8" letterSpacing="1.4" fontFamily="Inter, sans-serif">
        SQUAD OVERVIEW
      </text>
      {[
        [168, 30, '#4fd6e8'],
        [186, 52, '#4fd6e8'],
        [204, 21, '#f0b429'],
        [222, 44, '#4fd6e8'],
        [240, 62, '#7fdc6b'],
        [258, 33, '#4fd6e8'],
        [276, 50, '#4fd6e8'],
      ].map(([x, h, c], i) => (
        <rect
          key={x}
          className="art-bar"
          x={x}
          y={148 - h}
          width="11"
          height={h}
          rx="3"
          fill={c}
          style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${x}px 148px` }}
        />
      ))}
      <line x1="164" y1="152" x2="376" y2="152" stroke="#1c2833" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={300} y={70 + i * 26} width="70" height="18" rx="5" fill="#0f1922" stroke="#1c2833" />
          <circle cx={310} cy={79 + i * 26} r="3.5" fill={['#7fdc6b', '#f0b429', '#4fd6e8'][i]} />
          <text x={320} y={83 + i * 26} fill="#8798a9" fontSize="7.5" fontFamily="Inter, sans-serif">
            {['LOW RISK', 'MONITOR', 'READY'][i]}
          </text>
        </g>
      ))}

      {/* phone in front */}
      <g className="art-float">
        <rect x="24" y="58" width="104" height="164" rx="18" fill="#2c3d4d" />
        <rect x="29" y="63" width="94" height="154" rx="14" fill="url(#d-scr)" />
        <rect x="62" y="68" width="28" height="4" rx="2" fill="#0b141c" />
        <text x="40" y="94" fill="#6d7f91" fontSize="7.5" letterSpacing="1.2" fontFamily="Inter, sans-serif">
          CHECK-IN
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="40" y={104 + i * 22} width="72" height="14" rx="4" fill="#0f1922" stroke="#1c2833" />
            <rect className="art-fill" x="40" y={104 + i * 22} width={[58, 44, 66, 36][i]} height="14" rx="4" fill="#4fd6e8" opacity="0.75" style={{ animationDelay: `${i * 0.1}s` }} />
          </g>
        ))}
        <rect x="40" y="196" width="72" height="16" rx="5" fill="#4fd6e8" />
        <text x="56" y="207" fill="#04070a" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">
          SUBMIT
        </text>
      </g>

      {/* sync link */}
      <path className="art-dash" d="M132 140 L150 120" stroke="#4fd6e8" strokeWidth="2" strokeDasharray="5 5" fill="none" />
    </svg>
  );
}

/* ---------- export / integration ---------- */
export function ExportArt() {
  return (
    <svg viewBox="0 0 260 165" className="art" role="img" aria-label="Instant PDF and CSV exports for staff">
      {[
        ['PDF', 20, '#ff6b6b'],
        ['CSV', 100, '#7fdc6b'],
        ['API', 180, '#4fd6e8'],
      ].map(([label, x, c], i) => (
        <g key={label} className="art-float" style={{ animationDelay: `${i * 0.35}s` }}>
          <rect x={x} y="34" width="62" height="80" rx="9" fill="#0f1922" stroke="#1c2833" />
          <path d={`M${x + 44} 34 h18 v18 z`} fill="#1c2833" />
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={x + 12} y={60 + r * 12} width={r === 3 ? 22 : 38} height="5" rx="2.5" fill="#22303d" />
          ))}
          <rect x={x} y="122" width="62" height="18" rx="5" fill={c} opacity="0.15" />
          <text x={x + 31} y="135" fill={c} fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
            {label}
          </text>
        </g>
      ))}
    </svg>
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
