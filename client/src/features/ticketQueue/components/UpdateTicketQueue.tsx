import React, { useState } from 'react';
import { usePutApiTicketQueuesId, useGetApiTicketQueuesId } from '../../../api/ticket-queues';

const UpdateTicketQueue: React.FC = () => {
  const [queueId, setQueueId] = useState('');
  const [name, setName] = useState('');
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useGetApiTicketQueuesId(submittedId ?? 0, { query: { enabled: !!submittedId } });
  const mutation = usePutApiTicketQueuesId();

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(Number(queueId));
    setSuccess(false);
    setError(null);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittedId) return;
    mutation.mutate(
      { id: submittedId, data: { ...data?.data, name } },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (err: any) => {
          setError(err?.message || 'Failed to update ticket queue');
        },
      }
    );
  };

  return (
    <div>
      <h2>Update Ticket Queue</h2>
      <form onSubmit={handleIdSubmit}>
        <input
          type="number"
          value={queueId}
          onChange={e => setQueueId(e.target.value)}
          placeholder="Enter Queue ID"
          required
        />
        <button type="submit">Load Queue</button>
      </form>
      {isLoading && <div>Loading queue...</div>}
      {data?.data && (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={data.data.name || ''}
              required
            />
          </label>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
      {success && <div style={{ color: 'green' }}>Queue updated successfully!</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default UpdateTicketQueue;
