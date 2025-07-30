import { useGetApiUsers } from '../../../api/users';

export default function GetUsers() {
  const { data } = useGetApiUsers();

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {data?.data?.map(user => (
          <li key={user.id}>
            {user.userName} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
