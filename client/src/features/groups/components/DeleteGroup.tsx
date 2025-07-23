import React from 'react';

import { useDeleteApiGroupsId } from '../../../api/groups';

interface DeleteGroupProps {
  id: number;
}

const DeleteGroup: React.FC<DeleteGroupProps> = ({ id }) => {
  const { mutate } = useDeleteApiGroupsId();

  return (
    <button onClick={() => mutate({ id })} >
      Delete Group
    </button>
  );
};

export default DeleteGroup;
