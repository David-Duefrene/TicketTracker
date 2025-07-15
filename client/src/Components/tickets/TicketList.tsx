import React from 'react';
import { useGetApiTickets } from '../../api/tickets';

const TicketList: React.FC = () => {
  const { data, isLoading, error } = useGetApiTickets();

  if (isLoading) return <div>Loading tickets...</div>;
  if (error) return <div>Error loading tickets</div>;

  return (
    <div>
      <h2>All Tickets</h2>
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
