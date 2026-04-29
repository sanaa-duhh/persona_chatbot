import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import SuggestionChips from './SuggestionChips';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ persona, messages, isLoading, error, onSend }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    onSend(text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const showSuggestions = messages.length === 0 && persona?.suggestions;

  return (
    <div className="chat-window">
      <div className="messages">
        {showSuggestions && (
          <SuggestionChips suggestions={persona.suggestions} onSelect={onSend} />
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && <p className="error-msg">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <form className="input-bar" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={persona ? `Message ${persona.name}...` : 'Loading...'}
          disabled={isLoading || !persona}
        />
        <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}
