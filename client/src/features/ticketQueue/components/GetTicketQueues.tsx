import { useGetApiTicketQueues } from '../../../api/ticket-queues';

import SelectableList from '../../../components/ItemList/SelectableList';

type GetTicketQueuesProps = {
    onSelect?: ((e: React.FormEvent) => void) 
}

const GetTicketQueues: React.FC<GetTicketQueuesProps> = ({ onSelect }) => {
  const { data } = useGetApiTicketQueues({});
  if (!data?.data) throw new Error('No ticket queue data found');
  const ticketQueues = data.data;
  // if (ticketQueues.length === 0 || ) return <div>No ticket queues found</div>;

  return (
    <div>
      <h2>All Ticket Queues</h2>
      <SelectableList
        items={ticketQueues.map(queue => queue.name as string)} // TODO make name not nullable
        onSelect={onSelect}
      />
    </div>
  );
};

export default GetTicketQueues;
