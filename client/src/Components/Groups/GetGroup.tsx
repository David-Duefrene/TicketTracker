import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetApiGroupsId } from '../../api/groups';

const GetGroup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const { data, error, isLoading } = useGetApiGroupsId(groupId, {});

  if (isLoading) return <div>Loading group...</div>;
  if (error) return <div>Error loading group</div>;

  return (
    <div>
      <h2>Group Details</h2>
      <div>ID: {data?.data?.id}</div>
      <div>Name: {data?.data?.name}</div>
    </div>
  );
};

export default GetGroup;
