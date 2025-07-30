import React, { useState } from 'react';

import { usePutApiGroupsId } from '../../../api/groups';

interface UpdateGroupProps {
  id: number;
  initialName: string;
}

const UpdateGroup: React.FC<UpdateGroupProps> = ({ id, initialName }) => {
  const [name, setName] = useState(initialName);
  const { mutate, isPending, isSuccess } = usePutApiGroupsId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id, data: { name } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="submit" disabled={isPending}>Update Group</button>
      {isSuccess && <div>Group updated!</div>}
    </form>
  );
};

export default UpdateGroup;
