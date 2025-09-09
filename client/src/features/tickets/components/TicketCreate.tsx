import React, { useState } from 'react';

import { usePostApiTickets } from '../../../api/tickets';
import { useGetApiTicketQueues } from '../../../api/ticket-queues';

const TicketCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [queueName, setQueueName] = useState<string>(''); // Added missing property
  const [priority, setPriority] = useState<string>('Normal'); // Added missing property
  const [dueDate, setDueDate] = useState<string>(''); // Added missing property
  const { data: queues } = useGetApiTicketQueues();
  const mutation = usePostApiTickets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queueName) return;
    mutation.mutate({ 
      data: { 
        title, 
        description, 
        ticketQueue: {
          name: queueName
        },
        priority
      } 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={queueName} onChange={e => {
        const selectedQueue = queues?.data?.find(q => q.id === Number(e.target.value));
        setQueueName(selectedQueue?.name || '');
      }} required>
        <option value="">Select Queue</option>
        {queues?.data?.map(q => (
          <option key={q.id} value={q.id}>{q.name}</option>
        ))}
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)} required>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <input 
        type="date" 
        value={dueDate} 
        onChange={e => setDueDate(e.target.value)} 
        placeholder="Due Date" 
        required 
      />
      <button type="submit">Create</button>
      {mutation.isPending && <span>Creating...</span>}
      {mutation.isError && <span>Error creating ticket</span>}
      {mutation.isSuccess && <span>Ticket created!</span>}
    </form>
  );
};

export default TicketCreate;