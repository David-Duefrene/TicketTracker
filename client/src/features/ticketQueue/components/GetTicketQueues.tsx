import React from 'react';

import { useGetApiTicketQueues } from '../../../api/ticket-queues';

const GetTicketQueues: React.FC = () => {
  const { data, isLoading, error } = useGetApiTicketQueues({});

  return (
    <div>
      <h2>All Ticket Queues</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading ticket queues</div>}
      <ul>
        {data?.data?.map(queue => (
          <li key={queue.id}>
            {queue.name} (ID: {queue.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTicketQueues;
