import { useState } from 'react'
import { signUp, confirmSignUp } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await signUp({
        username,
        password,
        options: {
            userAttributes: {
              email: email
            },
          }
      })
      setStep(2)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleConfirm = async () => {
    try {
      await confirmSignUp({
        username: username,
        confirmationCode: code
      })
      navigate('/login')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {step === 1 ? (
        <>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleSignup}>Sign Up</button>
        </>
      ) : (
        <>
          <input placeholder="Confirmation Code" value={code} onChange={e => setCode(e.target.value)} />
          <button onClick={handleConfirm}>Confirm Sign Up</button>
        </>
      )}
    </div>
  )
}

export default Signup
