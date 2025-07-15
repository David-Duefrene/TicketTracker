import React, { useState } from 'react';
import { usePostApiTicketQueues } from '../../api/ticket-queues'

import type { TicketQueue } from '../../api/model/ticketQueue';
import { useAuth } from '../../context/AuthContext';

const CreateTicketQueue: React.FC = () => {
    const { token } = useAuth();
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutation = usePostApiTicketQueues();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        mutation.mutate(
            { data: { name } as TicketQueue },
            {
                onSuccess: () => {
                    setSuccess(true);
                    setName('');
                },
                onError: (err: any) => {
                    setError(err?.message || 'Failed to create ticket queue');
                },
            }
        );
    };

    if (!token) {
        return <div>Please log in to create a ticket queue.</div>;
    }

    return (
        <div>
            <h2>Create Ticket Queue</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Creating...' : 'Create'}
                </button>
            </form>
            {success && <div style={{ color: 'green' }}>Ticket queue created successfully!</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default CreateTicketQueue;