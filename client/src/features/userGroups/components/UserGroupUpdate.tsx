import { useState } from 'react';

import { usePutApiGroupsId } from '../../../api/groups';

import type { UserGroup } from '../../../api/model/userGroup';
import type { User } from '../../../api/model';

interface Props {
  id: number;
}

const UserGroupUpdate: React.FC<Props> = ({ id }) => {
  const [userId, setUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const mutation = usePutApiGroupsId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUserGroup: UserGroup = {
      id,
      user: { id: userId } as User,
      groupId: Number(groupId),
      group: { id: Number(groupId) },
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
      <button type="submit" disabled={mutation.isPending}>Update</button>
      {mutation.isError && <div>Error updating user group</div>}
      {mutation.isSuccess && <div>User group updated!</div>}
    </form>
  );
};

export default UserGroupUpdate;
