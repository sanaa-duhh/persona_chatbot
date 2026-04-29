export default function PersonaSwitcher({ personas, activePersonaId, onSelect, disabled }) {
  return (
    <nav className="persona-switcher">
      {personas.map((persona) => (
        <button
          key={persona.id}
          className={`persona-btn ${persona.id === activePersonaId ? 'active' : ''}`}
          onClick={() => onSelect(persona.id)}
          disabled={disabled}
        >
          {persona.emoji && <span className="persona-emoji">{persona.emoji}</span>}
          {persona.name}
        </button>
      ))}
    </nav>
  );
}
