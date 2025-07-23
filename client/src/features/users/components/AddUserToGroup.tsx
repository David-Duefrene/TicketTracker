import { useState } from 'react';
import { useGetApiUsers, usePutApiUsersId } from '../../../api/users';
import { useGetApiGroups } from '../../../api/groups';
import type { User } from '../../../api/model/user';
import type { Group } from '../../../api/model/group';

const AddUserToGroup = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const { data: usersData, isLoading: usersLoading } = useGetApiUsers();
  const { data: groupsData, isLoading: groupsLoading } = useGetApiGroups();
  const putUserMutation = usePutApiUsersId();

  const users: User[] = usersData?.data || [];
  const groups: Group[] = groupsData?.data || [];

  const filteredUsers = users.filter(
    (u) =>
      u.userName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!selectedUser || !selectedGroupId) return;
    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) return;
    const updatedUser: User = {
      ...selectedUser,
      userGroups: [
        ...(selectedUser.userGroups || []),
        { user: selectedUser, groupId: selectedGroupId, group }
      ]
    };
    putUserMutation.mutate({ id: selectedUser.id!, data: updatedUser });
  };

  return (
    <div>
      <h2>Add User to Group</h2>
      <div>
        <input
          type="text"
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {usersLoading ? (
          <div>Loading users...</div>
        ) : (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id || ''}>
                <button
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  style={{ fontWeight: selectedUser?.id === user.id ? 'bold' : 'normal' }}
                >
                  {user.userName} ({user.email ? user.email : 'No email'})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label>Select Group: </label>
        {groupsLoading ? (
          <span>Loading groups...</span>
        ) : (
          <select
            value={selectedGroupId ?? ''}
            onChange={(e) => setSelectedGroupId(Number(e.target.value))}
          >
            <option value="" disabled>
              -- Select a group --
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          disabled={!selectedUser || !selectedGroupId || putUserMutation.status === 'pending'}
          onClick={handleAdd}
        >
          Add User to Group
        </button>
        {putUserMutation.isSuccess && <span style={{ color: 'green', marginLeft: 8 }}>User added!</span>}
        {putUserMutation.isError && <span style={{ color: 'red', marginLeft: 8 }}>Error adding user.</span>}
      </div>
    </div>
  );
};

export default AddUserToGroup;
