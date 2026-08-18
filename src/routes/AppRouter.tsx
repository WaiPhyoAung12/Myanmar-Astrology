import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../pages/HomePage'
import { LoveCompatibilityPage } from '../pages/LoveCompatibilityPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PersonalReadingPage } from '../pages/PersonalReadingPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="personal-reading" element={<PersonalReadingPage />} />
        <Route path="love-compatibility" element={<LoveCompatibilityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
