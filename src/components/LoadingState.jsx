// Section 33: skeleton loading state, shared across modules.
export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <div className="skeleton-line" />
      <div className="skeleton-line" style={{ width: '70%' }} />
      <div className="skeleton-line" style={{ width: '40%' }} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
