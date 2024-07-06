// ProtectedRoutes.tsx

import React from 'react'
import { useAuth } from '@/Context/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import { LOGIN } from '@/Route/router-const'

type Props = {
  children: React.ReactNode
  allowedRoles?: string[]
}

const ProtectedRoutes = ({ children, allowedRoles = [] }: Props) => {
  const location = useLocation()
  const auth = useAuth()
  const { isLoggedIn, user } = auth
  if (typeof isLoggedIn !== 'function') {
    console.error('isLoggedIn is not a function:', isLoggedIn)
    return <Navigate to={`/${LOGIN}`} state={{ from: location }} replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || 'N/A')) {
    return <Navigate to='/not-authorized' replace />
  }

  return <>{children}</>
}

export default ProtectedRoutes
