// Section 33: empty state pattern — "No transactions yet. [+ ADD]" —
// used instead of a blank screen anywhere a list can be empty.
export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="state state--empty">
      <p>{message}</p>
      {actionLabel && (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
