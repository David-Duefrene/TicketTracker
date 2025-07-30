import { useDeleteApiGroupCaseQueuePermissionJuntionsId } from '../../../api/group-case-queue-permission-juntions';

interface Props {
  id: number;
}

const DeleteGroupCaseQueuePermissionJuntion: React.FC<Props> = ({ id }) => {
  const { mutate, isPending, isSuccess } = useDeleteApiGroupCaseQueuePermissionJuntionsId();

  const handleDelete = () => {
    mutate({ id });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isPending}>Delete</button>
      {isSuccess && <span>Deleted successfully</span>}
    </div>
  );
};

export default DeleteGroupCaseQueuePermissionJuntion;
