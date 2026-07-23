import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven reveal. Adds `.is-in` once the element enters the viewport,
 * which the stylesheet turns into a fade + rise (or a slide, per `variant`).
 */
export default function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  as: Tag = 'div',
  className = '',
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nodes that mount already on-screen (anything rendered after the API
    // resolves) must show immediately — waiting on the observer alone can
    // leave them stuck at opacity 0.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setSeen(true);
      if (once) return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setSeen(false);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${seen ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = null;
    let timer = null;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return setN(value);
      }

      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Guarantee the final value even if rAF is throttled (background tab,
      // headless capture) — the number must never be left mid-count.
      timer = setTimeout(() => setN(value), duration + 120);
    };

    // Already on screen at mount? Start now — waiting on the observer alone
    // can leave the figure stuck at zero.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) run();

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.unobserve(el);
          run();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
