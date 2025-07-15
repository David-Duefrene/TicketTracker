import React, { useState } from 'react';
import { usePostApiUserGroups } from '../../api/user-groups';
import type { UserGroup } from '../../api/model/userGroup';

const UserGroupCreate: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const mutation = usePostApiUserGroups();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserGroup: UserGroup = {
      user: { id: Number(userId) } as any,
      groupId: Number(groupId),
      group: { id: Number(groupId) } as any,
    };
    mutation.mutate({ data: newUserGroup });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User Group</h2>
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
      <button type="submit" disabled={mutation.isLoading}>Create</button>
      {mutation.isError && <div>Error creating user group</div>}
      {mutation.isSuccess && <div>User group created!</div>}
    </form>
  );
};

export default UserGroupCreate;
