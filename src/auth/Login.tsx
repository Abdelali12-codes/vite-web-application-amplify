import { useState } from 'react'
import { signIn } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await signIn({
        username: username,
        password: password
      })
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Login
