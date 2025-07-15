import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApiGroupsId } from '../../api/groups';

interface DeleteGroupProps {
  id: number;
}

const DeleteGroup: React.FC<DeleteGroupProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteApiGroupsId(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isLoading}>
      Delete Group
    </button>
  );
};

export default DeleteGroup;
