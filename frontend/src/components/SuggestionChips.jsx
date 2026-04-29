export default function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div className="suggestion-chips">
      {suggestions.map((s) => (
        <button key={s} className="chip" onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
