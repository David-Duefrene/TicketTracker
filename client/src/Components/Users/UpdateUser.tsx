import { usePutApiUsersId } from '../../api/users';
import { useState } from 'react';

export default function UpdateUser() {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = usePutApiUsersId({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        setError(null);
      },
      onError: (err: any) => {
        setError(err?.message || 'Failed to update user');
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    mutation.mutate({ id: Number(userId), data: { id: Number(userId), userName, email } });
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Updating...' : 'Update User'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>User updated successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
