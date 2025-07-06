import React, { useState } from 'react';
import { usePostApiAuthLogin } from '../api/auth';
import type { AuthUser } from '../api/model/authUser';

const Login: React.FC = () => {
  const [form, setForm] = useState<AuthUser>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const mutation = usePostApiAuthLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setError(null);

      mutation.mutate(
      { data: form },
      {
        onSuccess: (data) => {
              console.log('Login successful', data);
              // TODO store token in a context and redirect to dashboard/last page requested
        },
        onError: (err: unknown) => {
            setError('Invalid username or password');
            console.error('Login failed', err);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
