import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ role, content }) {
  return (
    <div className={`message-wrapper ${role}`}>
      {role === 'user' && <span className="message-label">You</span>}
      <div className={`message ${role}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
