import { useState, useEffect } from 'react';
import PersonaSwitcher from './components/PersonaSwitcher';
import ChatWindow from './components/ChatWindow';
import { fetchPersonas } from './api/chat';
import { useChat } from './hooks/useChat';

export default function App() {
  const [personas, setPersonas] = useState([]);
  const [activePersonaId, setActivePersonaId] = useState(null);

  const { messages, isLoading, error, send, reset } = useChat(activePersonaId);

  useEffect(() => {
    fetchPersonas()
      .then((data) => {
        setPersonas(data);
        setActivePersonaId(data[0]?.id ?? null);
      })
      .catch(console.error);
  }, []);

  function handlePersonaChange(personaId) {
    if (personaId === activePersonaId) return;
    setActivePersonaId(personaId);
    reset();
  }

  const activePersona = personas.find((p) => p.id === activePersonaId);

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">AI Chatbot</h1>
        <button className="clear-btn" onClick={reset} disabled={messages.length === 0}>
          Clear Chat
        </button>
      </header>

      <PersonaSwitcher
        personas={personas}
        activePersonaId={activePersonaId}
        onSelect={handlePersonaChange}
        disabled={isLoading}
      />

      <ChatWindow
        persona={activePersona}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={send}
      />
    </div>
  );
}
