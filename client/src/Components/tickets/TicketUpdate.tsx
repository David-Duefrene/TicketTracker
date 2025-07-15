import React, { useState } from 'react';
import { usePutApiTicketsId, useGetApiTicketsId } from '../../api/tickets';
import { useGetApiTicketQueues } from '../../api/ticket-queues';

interface Props {
  id: number;
}

const TicketUpdate: React.FC<Props> = ({ id }) => {
  const { data } = useGetApiTicketsId(id);
  const ticket = data?.data;
  const [title, setTitle] = useState(ticket?.title || '');
  const [description, setDescription] = useState(ticket?.description || '');
  const [queueId, setQueueId] = useState(ticket?.ticketQueue?.id || '');
  const { data: queues } = useGetApiTicketQueues();
  const mutation = usePutApiTicketsId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, data: { ...ticket, title, description, ticketQueue: { id: Number(queueId) } } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Ticket</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={queueId} onChange={e => setQueueId(e.target.value)} required>
        <option value="">Select Queue</option>
        {queues?.data?.map(q => (
          <option key={q.id} value={q.id}>{q.name}</option>
        ))}
      </select>
      <button type="submit">Update</button>
      {mutation.isLoading && <span>Updating...</span>}
      {mutation.isError && <span>Error updating ticket</span>}
      {mutation.isSuccess && <span>Ticket updated!</span>}
    </form>
  );
};

export default TicketUpdate;
