import React from 'react';

import { useGetApiGroups } from '../../../api/groups';

const UserGroupList: React.FC = () => {
  const { data, isLoading, error } = useGetApiGroups();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user groups</div>;

  return (
    <div>
      <h2>User Groups</h2>
      <ul>
        {data?.data?.map((ug) => (
          <li key={ug.id}>
            ID: {ug.id}, Group: {ug.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGroupList;
