import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import { useAuth } from '@/contexts/AuthContext'

// Lazy-loaded routes for code splitting
const Search = React.lazy(() => import('@/pages/Search'))
const ListingDetail = React.lazy(() => import('@/pages/ListingDetail'))
const CreateListing = React.lazy(() => import('@/pages/CreateListing'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const Messages = React.lazy(() => import('@/pages/Messages'))
const Help = React.lazy(() => import('@/pages/Help'))
const TermsOfService = React.lazy(() => import('@/pages/TermsOfService'))
const PrivacyPolicy = React.lazy(() => import('@/pages/PrivacyPolicy'))
const RefundPolicy = React.lazy(() => import('@/pages/RefundPolicy'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, openLogin } = useAuth()

  React.useEffect(() => {
    if (!isLoggedIn) openLogin()
  }, [isLoggedIn, openLogin])

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/help" element={<Help />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
