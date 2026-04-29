// In dev, VITE_API_URL is empty and Vite proxy handles /api → localhost:3001
// In production, VITE_API_URL is set to the deployed backend URL
const BASE = import.meta.env.VITE_API_URL || '';

export async function fetchPersonas() {
  const res = await fetch(`${BASE}/api/personas`);
  if (!res.ok) throw new Error('Failed to load personas');
  return res.json();
}

export async function sendMessage(personaId, messages) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personaId, messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data.reply;
}
