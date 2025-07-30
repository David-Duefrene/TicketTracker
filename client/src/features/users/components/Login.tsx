import { useState } from 'react';

import { usePostApiAuthLogin } from '../../../api/auth';
import type { AuthUser } from '../../../api/model/authUser';

import { useAuth, setCurrentToken } from '../../../context/AuthContext';

const Login: React.FC = () => {
    const [form, setForm] = useState<AuthUser>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const mutation = usePostApiAuthLogin();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        mutation.mutate(
            { data: form },
            {
                onSuccess: (data: any) => {
                    const token = data?.data?.token;
                    if (token) {
                        setCurrentToken(token);
                        login(token);
                    } else {
                        setError('Login response did not contain a token.');
                    }
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
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
