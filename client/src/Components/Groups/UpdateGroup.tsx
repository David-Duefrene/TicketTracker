import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putApiGroupsId } from '../../api/groups';

interface UpdateGroupProps {
  id: number;
  initialName: string;
}

const UpdateGroup: React.FC<UpdateGroupProps> = ({ id, initialName }) => {
  const [name, setName] = useState(initialName);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { id: number; name: string }) => putApiGroupsId(data.id, { name: data.name }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="submit" disabled={mutation.isLoading}>Update Group</button>
      {mutation.isError && <div>Error updating group</div>}
      {mutation.isSuccess && <div>Group updated!</div>}
    </form>
  );
};

export default UpdateGroup;
