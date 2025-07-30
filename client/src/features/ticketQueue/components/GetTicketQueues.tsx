import { useGetApiTicketQueues } from '../../../api/ticket-queues';

import SelectableList from '../../../components/ItemList/SelectableList';

const GetTicketQueues: React.FC = () => {
  const { data } = useGetApiTicketQueues({});
  if (!data?.data) throw new Error('No ticket queue data found');

  return (
    <div>
      <h2>All Ticket Queues</h2>
      <SelectableList
        items={data.data.map(queue => queue.name)}
      />
    </div>
  );
};

export default GetTicketQueues;
