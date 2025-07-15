import { useGetApiUsers } from '../../api/users';
import { useState } from 'react';

export default function GetUsers() {
  const { data, isLoading, error } = useGetApiUsers();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {data?.data?.map(user => (
          <li key={user.id}>
            {user.userName} ({user.email})
            {/*<button onClick={() => setSelectedUserId(user.id)}>View</button>*/ /*TODO link ti GetUser*/}
          </li>
        ))}
      </ul>
    </div>
  );
}
