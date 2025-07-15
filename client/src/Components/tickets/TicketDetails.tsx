import React from 'react';
import { useGetApiTicketsId } from '../../api/tickets';
import { useGetApiTicketQueuesId } from '../../api/ticket-queues';

interface Props {
  id: number;
}

const TicketDetails: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = useGetApiTicketsId(id);
  const ticket = data?.data;
  const queueId = ticket?.ticketQueue?.id;
  const { data: queueData } = useGetApiTicketQueuesId(queueId, { query: { enabled: !!queueId } });

  if (isLoading) return <div>Loading ticket...</div>;
  if (error) return <div>Error loading ticket</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div>
      <h2>Ticket #{ticket.id}</h2>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Owner:</strong> {ticket.assignedTo}</p>
      <p><strong>Queue:</strong> {queueData?.data?.name || ticket.ticketQueue?.name}</p>
    </div>
  );
};

export default TicketDetails;
