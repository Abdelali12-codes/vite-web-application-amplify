import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    getCurrentUser()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
  }, [])

  if (authenticated === null) return <p>Loading...</p>
  if (!authenticated) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
