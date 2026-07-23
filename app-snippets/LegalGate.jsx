/**
 * ONE-TIME TERMS & PRIVACY ACCEPTANCE GATE — reference implementation
 * for the SolidCore mobile app's login screen.
 *
 * This file is NOT part of the website build. It lives here so the wording
 * and the acceptance rules stay in one place with the published policies.
 * Copy it into the app project and wire `onAccepted` to your sign-in call.
 *
 * Rules it enforces (these are the ones that matter legally):
 *   1. The box starts UNCHECKED. Never pre-tick consent.
 *   2. Sign-in is disabled until it is ticked — no way through without it.
 *   3. Terms and Privacy are separately reachable links, not buried text.
 *   4. What was accepted is recorded: version + timestamp, sent to the
 *      backend with the login so you can prove consent later.
 *   5. Asked once. If the stored version matches ACCEPTED_VERSION, the gate
 *      does not reappear on subsequent logins.
 *
 * Bump ACCEPTED_VERSION whenever the policies materially change — that
 * re-prompts every user, which is the point.
 */

import { useEffect, useState } from 'react';

export const ACCEPTED_VERSION = '2026-07-01';
const STORAGE_KEY = 'solidcore.legal.accepted';

/** Has this user already accepted the current version? */
export async function hasAcceptedCurrent(storage) {
  try {
    const raw = await storage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return JSON.parse(raw).version === ACCEPTED_VERSION;
  } catch {
    return false;
  }
}

export async function recordAcceptance(storage) {
  const record = { version: ACCEPTED_VERSION, acceptedAt: new Date().toISOString() };
  await storage.setItem(STORAGE_KEY, JSON.stringify(record));
  return record;
}

/**
 * @param {object}   props
 * @param {object}   props.storage      AsyncStorage / localStorage-like
 * @param {function} props.onAccepted   called with the acceptance record
 * @param {function} props.openTerms    open the Terms screen
 * @param {function} props.openPrivacy  open the Privacy screen
 * @param {boolean}  props.busy         sign-in in flight
 */
export default function LegalGate({ storage, onAccepted, openTerms, openPrivacy, busy }) {
  // Never initialise this to true.
  const [agreed, setAgreed] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(null);

  useEffect(() => {
    let cancelled = false;
    hasAcceptedCurrent(storage).then((v) => {
      if (!cancelled) setAlreadyAccepted(v);
    });
    return () => {
      cancelled = true;
    };
  }, [storage]);

  // Still checking storage — render nothing rather than flashing the gate.
  if (alreadyAccepted === null) return null;

  // Accepted the current version already: one-time, so stay out of the way.
  if (alreadyAccepted) return null;

  async function handleContinue() {
    if (!agreed) return;
    const record = await recordAcceptance(storage);
    onAccepted(record);
  }

  return (
    <div className="legalgate">
      <label className="legalgate-row">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          aria-describedby="legalgate-help"
        />
        <span>
          I have read and agree to the{' '}
          <button type="button" className="legalgate-link" onClick={openTerms}>
            Terms &amp; Conditions
          </button>{' '}
          and{' '}
          <button type="button" className="legalgate-link" onClick={openPrivacy}>
            Privacy Policy
          </button>
          , including consent to tracking of my physical metrics, sleep and fatigue.
        </span>
      </label>

      <p id="legalgate-help" className="legalgate-help">
        Required to continue. You can withdraw consent later in Privacy &amp; Security.
      </p>

      <button
        type="button"
        className="legalgate-cta"
        disabled={!agreed || busy}
        onClick={handleContinue}
      >
        {busy ? 'Signing in…' : 'Agree & Continue'}
      </button>
    </div>
  );
}
