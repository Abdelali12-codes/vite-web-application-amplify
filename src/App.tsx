import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ProtectedRoute from './auth/ProtectedRoute'
import { fetchAuthSession, signOut } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProtectedPage() {
  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    const callApi = async () => {
      const { accessToken: _ , idToken } = (await fetchAuthSession()).tokens ?? {};
      const res = await axios.get('http://localhost:5000/protected', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${idToken}` },
      })
      setMsg(res.data.message)
    }

    callApi()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{msg}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
