import { useState } from 'react';

import { usePostApiGroups } from '../../../api/groups';

const UserGroupCreate = () => {
  const [groupName, setGroupName] = useState('');
  const { mutate, isPending, isError, isSuccess } = usePostApiGroups();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    mutate({ data: { name: groupName } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        required
      />
      <button type="submit" disabled={isPending}>Create</button>
      {isError && <p style={{ color: 'red' }}>Error creating user group</p>}
      {isSuccess && <p style={{ color: 'green' }}>User group created!</p>}
    </form>
  );
};

export default UserGroupCreate;
