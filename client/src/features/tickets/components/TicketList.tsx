import React from 'react';

import {Api} from '../../../../plugin/Api';
import { useGetApiTickets } from '../../../api/tickets';
import type { Ticket } from '../../../api/model';

export const TicketList = ({ tickets = Api(useGetApiTickets) }: { tickets?: Ticket[]; }) => {
  if (tickets?.length === 0) return <div>No tickets found.</div>;

  return (
    <div>
      <ul>
        {tickets?.map(ticket => (
          <li key={ticket.id}>
            #{ticket.id}: {ticket.title} ({ticket.status})
          </li>
        ))}
      </ul>
    </div>
  );
};
