import React from 'react';
import { useGetApiUserGroupsId } from '../../api/user-groups';

interface Props {
  id: number;
}

const UserGroupDetail: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = useGetApiUserGroupsId(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user group</div>;

  const ug = data?.data;
  if (!ug) return <div>User group not found</div>;

  return (
    <div>
      <h2>User Group Detail</h2>
      <div>ID: {ug.id}</div>
      <div>User: {ug.user?.id}</div>
      <div>Group: {ug.group?.name}</div>
    </div>
  );
};

export default UserGroupDetail;
