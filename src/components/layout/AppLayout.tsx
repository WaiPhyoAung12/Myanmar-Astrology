import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Personal Reading', to: '/personal-reading' },
  { label: 'Love Compatibility', to: '/love-compatibility' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-stone-200/80 bg-cream/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="text-lg font-semibold tracking-tight text-maroon">Myanmar Astrology</NavLink>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'font-semibold text-maroon' : 'text-stone-600 transition-colors hover:text-maroon'}>{item.label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-500">Myanmar Astrology · Version 1 foundation</footer>
    </div>
  )
}
