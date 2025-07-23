import { useGetApiUsersId } from '../../../api/users';
import { useState } from 'react';

export default function GetUser() {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null); // TODO Get UserID by URL
  const { data, isLoading, error } = useGetApiUsersId(submittedId ?? '0', { query: { enabled: !!submittedId } });

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
      {isLoading && <div>Loading user...</div>}
      {error && <div>Error loading user</div>}
      {data?.data && (
        <div>
          <p>ID: {data.data.id}</p>
          <p>Username: {data.data.userName}</p>
          <p>Email: {data.data.email}</p>
        </div>
      )}
    </div>
  );
}
