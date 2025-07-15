import React from 'react';
import { useDeleteApiTicketsId } from '../../api/tickets';

interface Props {
  id: number;
}

const TicketDelete: React.FC<Props> = ({ id }) => {
  const mutation = useDeleteApiTicketsId();

  const handleDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <button onClick={handleDelete} disabled={mutation.isLoading}>
      Delete Ticket
      {mutation.isLoading && <span>...</span>}
      {mutation.isError && <span>Error deleting ticket</span>}
      {mutation.isSuccess && <span>Deleted!</span>}
    </button>
  );
};

export default TicketDelete;
