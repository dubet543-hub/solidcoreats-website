const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const getFeatures = () => request('/api/features');
export const submitLead = (payload) =>
  request('/api/leads', { method: 'POST', body: JSON.stringify(payload) });
