import React from 'react';
import { useGetApiTickets } from '../../../api/tickets';

type TicketListProps = {
  status: 'open' | 'my';
};

const TicketList: React.FC<TicketListProps> = ({ status }) => {
  const { data } = useGetApiTickets();

  return (
    <div>
      <h2>{status === 'open' ? 'Open Tickets' : 'My Tickets'}</h2>
      <ul>
        {data?.data?.map(ticket => (
          <li key={ticket.id}>
            #{ticket.id}: {ticket.title} ({ticket.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
