import React from 'react';

import { useGetApiTicketsId } from '../../../api/tickets';
import { useGetApiTicketQueuesId } from '../../../api/ticket-queues';

interface Props {
  id: number;
}

const TicketDetails: React.FC<Props> = ({ id }) => {
  const { data } = useGetApiTicketsId(id);
  const ticket = data?.data;
  const queueId = ticket?.ticketQueue?.id;
  if (!queueId) throw new Error('Ticket does not have an associated queue ID');
  const { data: queueData } = useGetApiTicketQueuesId(queueId, { query: { enabled: !!queueId } });

  if (!ticket) throw new Error('Ticket not found');

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
