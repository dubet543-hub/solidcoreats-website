import { useState } from 'react';

/**
 * Service plans as a tab switcher. The Bio-Lab plan is a superset of the
 * Optimisation plan, so its shared items render as "everything above, plus"
 * rather than repeating the list.
 */
const BASE_FEATURES = [
  'Workload Monitoring',
  'Proactive Recovery Measures',
  'Strategic Load Modulation',
  'Body Composition Analysis',
];

export const PLANS = [
  {
    key: 'optimisation',
    tab: 'Athlete Optimisation',
    name: 'Athlete Optimisation Plan',
    price: '₹20,000',
    period: 'per year · incl. GST',
    blurb: 'Annual app subscription covering core load management and recovery for athletes in season.',
    features: BASE_FEATURES,
    extras: [],
  },
  {
    key: 'biolab',
    tab: 'Solidcore Bio-Lab',
    name: 'Solidcore Bio-Lab Plan',
    price: '₹25,000',
    period: 'per year · incl. GST',
    blurb: 'Annual app subscription with everything in the Optimisation plan, plus full biomechanical assessment.',
    features: BASE_FEATURES,
    extras: ['Postural Analysis', 'Corrective Measures', 'Running Mechanics', 'Bowling Analysis'],
  },
];

export default function Plans() {
  const [active, setActive] = useState(0);
  const plan = PLANS[active];

  // Left/right arrows move between tabs, as expected of a tablist.
  function onKeyDown(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (active + 1) % PLANS.length : (active - 1 + PLANS.length) % PLANS.length;
    setActive(next);
    document.getElementById(`plantab-${PLANS[next].key}`)?.focus();
  }

  return (
    <div className="plans">
      <div className="plantabs" role="tablist" aria-label="Service plans" onKeyDown={onKeyDown}>
        {PLANS.map((p, i) => (
          <button
            key={p.key}
            id={`plantab-${p.key}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`planpanel-${p.key}`}
            tabIndex={i === active ? 0 : -1}
            className={`plantab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="plantab-name">{p.tab}</span>
            <span className="plantab-price">
              {p.price} <em>/ year</em>
            </span>
          </button>
        ))}
      </div>

      <div
        className="planpanel"
        role="tabpanel"
        id={`planpanel-${plan.key}`}
        aria-labelledby={`plantab-${plan.key}`}
        key={plan.key}
      >
        <div className="planpanel-head">
          <div>
            <h3>{plan.name}</h3>
            <p className="plan-blurb">{plan.blurb}</p>
          </div>
          <div className="plan-price">
            <b>{plan.price}</b>
            <span>{plan.period}</span>
          </div>
        </div>

        <ul className="plan-list">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {plan.extras.length > 0 && (
          <>
            <span className="plan-divider">Everything above, plus</span>
            <ul className="plan-list plan-list--extra">
              {plan.extras.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}

        <a className="btn plan-cta" href="#contact">
          Enquire about this subscription
        </a>
      </div>
    </div>
  );
}
