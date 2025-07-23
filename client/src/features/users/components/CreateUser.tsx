import { useState } from 'react';

import { usePostApiUsers } from '../../../api/users';

import { useAuth } from '../../../context/AuthContext';

export default function CreateUser() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
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
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      },
      onError: (error: any) => {
        setError(error?.message || 'Failed to create user');
      },
    },
  });

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
      // if (!form) {
      //   setError('Form is not properly initialized');
      //   throw new Error('Form is not properly initialized');
      //   return;
      // }
      mutation.mutate(
          { data: { 
            // ...form,
            password: password,
            username: userName
          } });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            name="username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
              <div>
                  <label>Password:</label>
                  <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                  />
              </div>
              <div>
                  <label>Confirm Password:</label>
                  <input
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                  />
              </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>User created successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
