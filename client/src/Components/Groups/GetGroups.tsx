import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApiGroups } from '../../api/groups';

const GetGroups: React.FC = () => {
  const { data, error, isLoading } = useQuery(['groups'], getApiGroups);

  if (isLoading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups</div>;

  return (
    <div>
      <h2>Groups List</h2>
      <ul>
        {data?.data?.map((group: any) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetGroups;
