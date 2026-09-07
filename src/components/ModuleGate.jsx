// Implements Section 9's pattern: does the user have a profile for this
// module? If yes, render the module; if no, show a "create profile" prompt.
// hasProfile/onCreateProfile are passed in for now since profile state
// (Phase 3) isn't wired up yet.
export default function ModuleGate({ hasProfile, moduleName, onCreateProfile, children }) {
  if (hasProfile) {
    return children;
  }

  return (
    <div className="module-gate">
      <p>You don't have a {moduleName} profile yet.</p>
      <button onClick={onCreateProfile}>Create {moduleName} Profile</button>
    </div>
  );
}
