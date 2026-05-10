import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { Plane, Eye, EyeOff } from 'lucide-react';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, signup } = useTravel();
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    if (!minLength) return "Password must be at least 8 characters.";
    if (!hasUpper) return "Password must contain an uppercase letter.";
    if (!hasSpecial) return "Password must contain a special character.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isLogin) {
      const pwdError = validatePassword(password);
      if (pwdError) {
        setErrorMsg(pwdError);
        return;
      }
      const res = signup(email, password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      navigate('/dashboard');
    } else {
      const res = login(email, password);
      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }
      navigate('/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div className="glass-panel" style={styles.card}>
        <div style={styles.header}>
          <Plane color="var(--accent-teal)" size={48} style={{ marginBottom: '1rem' }} />
          <h2>{isLogin ? 'Welcome Back' : 'Join Traveloop'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Log in to manage your trips' : 'Securely create your account'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(251, 113, 133, 0.1)', color: 'var(--accent-coral)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(251, 113, 133, 0.3)', fontSize: '0.875rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <label className="input-label">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="input-field" 
              style={{ paddingRight: '2.5rem' }}
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.footer}>
          <button 
            type="button"
            style={styles.textBtn} 
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setPassword(''); }}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
          {isLogin && <button type="button" style={styles.textBtn}>Forgot Password?</button>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  header: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  textBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
  }
};

export default AuthScreen;
