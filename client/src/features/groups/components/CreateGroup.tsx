import React, { useState } from 'react';

import { usePostApiGroups } from '../../../api/groups';
import type { Group } from '../../../api/model/group';

const CreateGroup: React.FC = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess
  } = usePostApiGroups();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      setSuccess(false);
    const group: Group = { name };

    mutate(
      { data: group },
      {
        onSuccess: () => {
          setSuccess(true);
          setName('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group</h2>
      <div>
        <label htmlFor="group-name">Name:</label>
        <input
          id="group-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Group'}
      </button>
      {isError && (
        <div style={{ color: 'red' }}>Error: {(error as any)?.message || 'Failed to create group.'}</div>
      )}
      {isSuccess && success && (
        <div style={{ color: 'green' }}>Group created successfully!</div>
      )}
    </form>
  );
};

export default CreateGroup;
