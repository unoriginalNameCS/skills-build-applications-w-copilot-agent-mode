import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : '/api'

  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">Octofit Tracker</h1>
        <p className="text-body-secondary mb-3">
          React 19 presentation tier for activity tracking and team performance.
        </p>
        {!codespaceName && (
          <div className="alert alert-warning" role="alert">
            <strong>VITE_CODESPACE_NAME is not set.</strong> Using <code>/api</code>{' '}
            as a fallback base URL.
          </div>
        )}
        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'border border-secondary-subtle'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route
            path="/users"
            element={<Users endpoint={`${apiBaseUrl}/users/`} />}
          />
          <Route
            path="/teams"
            element={<Teams endpoint={`${apiBaseUrl}/teams/`} />}
          />
          <Route
            path="/activities"
            element={<Activities endpoint={`${apiBaseUrl}/activities/`} />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard endpoint={`${apiBaseUrl}/leaderboard/`} />}
          />
          <Route
            path="/workouts"
            element={<Workouts endpoint={`${apiBaseUrl}/workouts/`} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
