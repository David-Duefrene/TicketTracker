import { useState } from 'react';

import { usePostApiUsers } from '../../api/users';
import type { User } from '../../api/model/user';

import { useAuth } from '../../context/AuthContext';

const initialUser: Partial<User> = {
  userName: '',
  email: '',
};

export default function CreateUser() {
    const [form, setForm] = useState(initialUser);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { token } = useAuth();

    const mutation = usePostApiUsers({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        setError(null);
        setForm(initialUser);
      },
      onError: (err: unknown) => {
        setError(err?.message || 'Failed to create user');
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

      if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
      }

      // If the User type supports password, include it here
      console.log("token: ", token);
      mutation.mutate(
          { data: { ...form, password } as User });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            name="userName"
            value={form.userName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email || ''}
            onChange={handleChange}
            required
          />
        </div>
              <div>
                  <label>Password:</label>
                  <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                  />
              </div>
              <div>
                  <label>Confirm Password:</label>
                  <input
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                  />
              </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>User created successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
