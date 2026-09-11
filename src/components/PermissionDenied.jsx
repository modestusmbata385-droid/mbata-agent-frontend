// Section 33: permission-denied state, distinct from a generic error —
// shown when the backend returns 403.
export default function PermissionDenied({ message = "You don't have access to this." }) {
  return (
    <div className="state state--denied" role="alert">
      <p>🔒 {message}</p>
    </div>
  );
}
