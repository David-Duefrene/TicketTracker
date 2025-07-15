import React from 'react';
import { useDeleteApiGroupCaseQueuePermissionJuntionsId } from '../../api/group-case-queue-permission-juntions';

interface Props {
  id: number;
}

const DeleteGroupCaseQueuePermissionJuntion: React.FC<Props> = ({ id }) => {
  const mutation = useDeleteApiGroupCaseQueuePermissionJuntionsId();

  const handleDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={mutation.isLoading}>Delete</button>
      {mutation.isError && <span>Error deleting</span>}
      {mutation.isSuccess && <span>Deleted successfully</span>}
    </div>
  );
};

export default DeleteGroupCaseQueuePermissionJuntion;
