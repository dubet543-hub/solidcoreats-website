import { useState } from 'react';
import { submitLead } from '../api';
import { SUPPORT_EMAIL } from '../constants';

const EMPTY = { name: '', email: '', organisation: '', role: 'Athlete', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending…' });
    try {
      const r = await submitLead(form);
      setStatus({ type: 'ok', text: r.message });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="fld">
          <span>Name *</span>
          <input value={form.name} onChange={set('name')} required placeholder="Your full name" />
        </label>
        <label className="fld">
          <span>Email *</span>
          <input type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com" />
        </label>
      </div>

      <div className="form-row">
        <label className="fld">
          <span>Organisation</span>
          <input value={form.organisation} onChange={set('organisation')} placeholder="Club, academy or institution" />
        </label>
        <label className="fld">
          <span>I am a</span>
          <select value={form.role} onChange={set('role')}>
            {['Athlete', 'Coach', 'Physiotherapist', 'Institution', 'Other'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="fld">
        <span>Message</span>
        <textarea rows={4} value={form.message} onChange={set('message')} placeholder="Tell us about your squad, sport and monitoring needs…" />
      </label>

      <div className="form-foot">
        <button className="btn" type="submit" disabled={status.type === 'sending'}>
          {status.type === 'sending' ? 'Sending…' : 'Submit Enquiry'}
        </button>
        <span className="form-alt">
          or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </span>
      </div>

      {status.text && <p className={`note note--${status.type === 'ok' ? 'ok' : 'err'}`}>{status.text}</p>}
    </form>
  );
}
