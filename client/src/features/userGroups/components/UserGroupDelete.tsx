import React from 'react';
import { useDeleteApiGroupsId } from '../../../api/groups';
interface Props {
  id: number;
}

const UserGroupDelete: React.FC<Props> = ({ id }) => {
  const mutation = useDeleteApiGroupsId();

  const handleDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={mutation.isPending}>
        Delete User Group
      </button>
      {mutation.isError && <div>Error deleting user group</div>}
      {mutation.isSuccess && <div>User group deleted!</div>}
    </div>
  );
};

export default UserGroupDelete;
