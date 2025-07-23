import React, { useState } from 'react';

import { useGetApiTicketQueuesId } from '../../../api/ticket-queues';

const GetTicketQueue: React.FC = () => {
  const [queueId, setQueueId] = useState('');
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const { data, isLoading, error } = useGetApiTicketQueuesId(submittedId ?? 0, { query: { enabled: !!submittedId } });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(Number(queueId));
  };

  return (
    <div>
      <h2>Get Ticket Queue by ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={queueId}
          onChange={e => setQueueId(e.target.value)}
          placeholder="Enter Queue ID"
          required
        />
        <button type="submit">Get Queue</button>
      </form>
      {isLoading && <div>Loading queue...</div>}
      {error && <div>Error loading queue</div>}
      {data?.data && (
        <div>
          <p>ID: {data.data.id}</p>
          <p>Name: {data.data.name}</p>
        </div>
      )}
    </div>
  );
};

export default GetTicketQueue;
