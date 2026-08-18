import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="mx-auto max-w-3xl px-6 py-28 text-center"><p className="text-sm font-semibold text-saffron">404</p><h1 className="mt-4 text-4xl font-semibold text-ink">Page not found</h1><Link className="mt-8 inline-block font-semibold text-maroon hover:underline" to="/">Return home</Link></section>
}
