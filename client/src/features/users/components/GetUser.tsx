import { useGetApiUsersId } from '../../../api/users';
import { useState } from 'react';

export default function GetUser() {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null); // TODO Get UserID by URL
  const { data } = useGetApiUsersId(submittedId ?? '0', { query: { enabled: !!submittedId } });

  if (!data) throw new Error('User not found');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(userId);
  };

  return (
    <div>
      <h2>Get User by ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <button type="submit">Get User</button>
      </form>
        <div>
          <p>ID: {data.data.id}</p>
          <p>Username: {data.data.userName}</p>
          <p>Email: {data.data.email}</p>
        </div>
    </div>
  );
}
