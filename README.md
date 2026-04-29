# 🤖 Persona Chatbot

> Chat with three real-world personas — each with a distinct voice, mindset, and way of thinking. Not your average AI chatbot.

**[Live Demo →](https://persona-chatbot-opal.vercel.app)**

---

## What is this?

A persona-based AI chat app where you can have conversations with three distinct personalities from the Indian tech/education space. The core idea: **system prompt engineering** that makes each persona feel genuinely different — not just a reskinned GPT wrapper.

---

## The Personas

| Persona | Vibe | 
|---|---|
| 🎯 **Kshitij Mishra** | Sharp, challenging, slightly sarcastic, will question everything you think you know 🙂‍↕️|
| 🧠 **Anshuman Singh** | First-principles thinker, structured, calm |
| 🚀 **Abhimanyu Saxena** | Execution-focused founder, decisive, outcome-driven | 

---

## Tech Stack

- **Frontend** — React + Vite
- **Backend** — Node.js + Express
- **AI** — OpenRouter API (`gpt-4o-mini`)
- **Deployed on** — Vercel (frontend) + Render (backend)

---

## Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/sanaa-duhh/persona_chatbot.git
cd persona_chatbot
```

**2. Set up backend**
```bash
cd backend
cp .env.example .env
# Add your OPENROUTER_API_KEY to .env
npm install
npm run dev
```

**3. Set up frontend**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` — backend runs on port `3001`.

---

## Project Structure

```
persona_chatbot/
├── backend/
│   ├── src/
│   │   ├── routes/chat.js       # API endpoints
│   │   └── prompts/personas.js  # The heart of the project — system prompts
│   └── server.js
└── frontend/
    └── src/
        ├── components/          # UI components
        ├── hooks/useChat.js     # Chat state logic
        └── api/chat.js          # API calls
```

---

## Environment Variables

**Backend** (`.env`):
```
OPENROUTER_API_KEY=your_key_here
PORT=3001
```

**Frontend** (only needed for production):
```
VITE_API_URL=your_backend_url
```

---

## The Key Idea

Most chatbot projects just change the UI. This one focuses on **prompt engineering** — each persona has a detailed system prompt with communication style rules, beliefs, few-shot examples, and behavior constraints. Switching personas resets the conversation entirely, with zero context leakage between them.
