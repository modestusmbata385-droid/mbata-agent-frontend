import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useAuth } from '../state/AuthContext.jsx';
import './AppShell.css';

// Section 8 + 34: desktop sidebar, mobile drawer + bottom nav.
const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/finance', label: 'Finance', icon: '💰' },
  { to: '/business', label: 'Business', icon: '🏪' },
  { to: '/boss', label: 'Boss Connect', icon: '🔗' },
  { to: '/driver', label: 'Driver', icon: '🏍️' },
  { to: '/tenant', label: 'Tenant', icon: '🏠' },
  { to: '/education', label: 'Education', icon: '🎓' },
];
// Mobile bottom nav only has room for a handful — Section 34: primary actions only.
const BOTTOM_NAV_ITEMS = NAV_ITEMS.slice(0, 4);

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <button
          className="app-shell__menu-btn"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <span className="app-shell__logo">MBATA AGENT</span>
        <div className="app-shell__header-actions">
          <ThemeToggle />
          <button aria-label="Notifications">🔔</button>
          <button aria-label="Log out" onClick={logout}>👤</button>
        </div>
      </header>

      <div className="app-shell__body">
        <nav className="app-shell__sidebar" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="app-shell__nav-link" end={item.to === '/'}>
              <span aria-hidden="true">{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <nav
            className="drawer"
            aria-label="Main navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="drawer__close" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>×</button>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="drawer__link"
                end={item.to === '/'}
                onClick={() => setDrawerOpen(false)}
              >
                <span aria-hidden="true">{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" aria-label="Primary sections">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className="bottom-nav__link" end={item.to === '/'}>
            <span aria-hidden="true">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
