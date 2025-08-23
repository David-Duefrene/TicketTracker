import { useState } from 'react';

import { useGetApiTicketQueues } from '../../../api/ticket-queues';

import SelectableList from '../../../components/ItemList/SelectableList';

import useToggleList from '../../../hooks/useToggleList';


const GetTicketQueues: React.FC = () => {
  const { data } = useGetApiTicketQueues({});

  if (!data?.data) throw new Error('No ticket queue data found');

  const { items, toggle, has } = useToggleList<string>();

  return (
    <div>
      <h2>All Ticket Queues</h2>
      <SelectableList
        items={data.data.map(queue => queue.name)}
        onSelect={toggle}
      />
    </div>
  );
};

export default GetTicketQueues;
