import React, { useState } from 'react';
import { usePutApiUserGroupsId } from '../../api/user-groups';
import type { UserGroup } from '../../api/model/userGroup';

interface Props {
  id: number;
}

const UserGroupUpdate: React.FC<Props> = ({ id }) => {
  const [userId, setUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const mutation = usePutApiUserGroupsId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUserGroup: UserGroup = {
      id,
      user: { id: Number(userId) } as any,
      groupId: Number(groupId),
      group: { id: Number(groupId) } as any,
    };
    mutation.mutate({ id, data: updatedUserGroup });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update User Group</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Group ID"
        value={groupId}
        onChange={e => setGroupId(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isLoading}>Update</button>
      {mutation.isError && <div>Error updating user group</div>}
      {mutation.isSuccess && <div>User group updated!</div>}
    </form>
  );
};

export default UserGroupUpdate;
