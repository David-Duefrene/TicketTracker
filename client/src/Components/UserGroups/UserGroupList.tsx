import React from 'react';
import { useGetApiUserGroups } from '../../api/user-groups';

const UserGroupList: React.FC = () => {
  const { data, isLoading, error } = useGetApiUserGroups();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user groups</div>;

  return (
    <div>
      <h2>User Groups</h2>
      <ul>
        {data?.data?.map((ug) => (
          <li key={ug.id}>
            ID: {ug.id}, User: {ug.user?.id}, Group: {ug.group?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGroupList;
