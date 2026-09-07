import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [step, setStep] = useState('register'); // 'register' | 'otp'
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      setStep('otp');
      setMessage('Check your email for a 6-digit code.');
    } catch (err) {
      setError(err.response?.data?.errors?.join(' ') || err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { email: form.email, otp });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'otp') {
    return (
      <section>
        <h1>Verify your email</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleVerify}>
          {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
          <label>
            OTP
            <input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required />
          </label>
          <br />
          <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button>
        </form>
      </section>
    );
  }

  return (
    <section>
      <h1>Create account</h1>
      <form onSubmit={handleRegister}>
        {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
        <label>Full name<input value={form.fullName} onChange={update('fullName')} required /></label><br />
        <label>Email<input type="email" value={form.email} onChange={update('email')} required /></label><br />
        <label>Password<input type="password" value={form.password} onChange={update('password')} required /></label><br />
        <label>Confirm password<input type="password" value={form.confirmPassword} onChange={update('confirmPassword')} required /></label><br />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <p><Link to="/login">Already have an account? Log in</Link></p>
    </section>
  );
}
