import { useDeleteApiTicketsId } from '../../../api/tickets';

interface Props {
  id: number;
}

const TicketDelete: React.FC<Props> = ({ id }) => {
  const mutation = useDeleteApiTicketsId();

  const handleDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <button onClick={handleDelete} disabled={mutation.isPending}>
      Delete Ticket
      {mutation.isPending && <span>...</span>}
      {mutation.isSuccess && <span>Deleted!</span>}
    </button>
  );
};

export default TicketDelete;
