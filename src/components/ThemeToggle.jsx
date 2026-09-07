import { useTheme } from '../state/ThemeContext.jsx';

// Section 33: light / dark / system theme toggle.
export default function ThemeToggle() {
  const { preference, setTheme } = useTheme();
  return (
    <select
      value={preference}
      onChange={(e) => setTheme(e.target.value)}
      aria-label="Theme"
      className="theme-toggle"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
