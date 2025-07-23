import { useState } from 'react';

import { useDeleteApiUsersId } from '../../../api/users';

export default function DeleteUser() {
  const [userId, setUserId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useDeleteApiUsersId({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        setError(null);
      },
      onError: (err: any) => {
        setError(err?.message || 'Failed to delete user');
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    mutation.mutate({ id: userId });
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Deleting...' : 'Delete User'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>User deleted successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
