import React, { useState } from 'react';

import { useDeleteApiTicketQueuesId } from '../../../api/ticket-queues';

const DeleteTicketQueue: React.FC = () => {
  const [queueId, setQueueId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useDeleteApiTicketQueuesId();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    mutation.mutate(
      { id: Number(queueId) },
      {
        onSuccess: () => {
          setSuccess(true);
          setQueueId('');
        },
        onError: (err: any) => {
          setError(err?.message || 'Failed to delete ticket queue');
        },
      }
    );
  };

  return (
    <div>
      <h2>Delete Ticket Queue</h2>
      <form onSubmit={handleDelete}>
        <input
          type="number"
          value={queueId}
          onChange={e => setQueueId(e.target.value)}
          placeholder="Enter Queue ID"
          required
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </form>
      {success && <div style={{ color: 'green' }}>Queue deleted successfully!</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DeleteTicketQueue;
