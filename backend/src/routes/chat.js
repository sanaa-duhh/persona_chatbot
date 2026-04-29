const express = require('express');
const OpenAI = require('openai');
const personas = require('../prompts/personas');

const router = express.Router();
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// GET /api/personas — returns metadata only, never exposes system prompts
router.get('/personas', (req, res) => {
  const publicPersonas = Object.values(personas).map(({ id, name, emoji, suggestions }) => ({
    id,
    name,
    emoji,
    suggestions,
  }));
  res.json(publicPersonas);
});

// POST /api/chat
// Body: { personaId: string, messages: [{role, content}] }
// messages is the full history including the new user message as the last item
router.post('/chat', async (req, res) => {
  const { personaId, messages } = req.body;

  if (!personaId || !messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'personaId and messages array are required.' });
  }

  const persona = personas[personaId];
  if (!persona) {
    return res.status(400).json({ error: `Unknown persona: ${personaId}` });
  }

  if (!persona.systemPrompt) {
    return res.status(503).json({ error: 'Persona prompt not yet configured.' });
  }

  try {
    console.log(`[${persona.name}] "${messages[messages.length - 1].content}"`);

    const response = await client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: persona.systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = response.choices[0].message.content || 'Something went wrong. Try again.';

    res.json({ reply, persona: persona.name });
  } catch (err) {
    console.error('OpenRouter API error:', err.message);
    res.status(502).json({ error: 'Failed to get response from AI. Please try again.' });
  }
});

module.exports = router;
