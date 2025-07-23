import { useState } from 'react';

import { usePostApiGroupCaseQueuePermissionJuntions } from '../../../api/group-case-queue-permission-juntions';

import type { GroupCaseQueuePermissionJuntion } from '../../../api/model/groupCaseQueuePermissionJuntion';

const CreateGroupCaseQueuePermissionJuntion: React.FC = () => {
  const [form, setForm] = useState<GroupCaseQueuePermissionJuntion>({ group: { name: '' }, ticketQueue: { name: '' } });
  const { mutate, isPending, isError, isSuccess } = usePostApiGroupCaseQueuePermissionJuntions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ data: form });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group Case Queue Permission Juntion</h2>
      <input name="group" placeholder="Group Name" value={form.group?.name || ''} onChange={e => setForm({ ...form, group: { ...form.group, name: e.target.value } })} />
      <input name="ticketQueue" placeholder="Queue Name" value={form.ticketQueue?.name || ''} onChange={e => setForm({ ...form, ticketQueue: { ...form.ticketQueue, name: e.target.value } })} />
      <label><input type="checkbox" name="canCreate" checked={!!form.canCreate} onChange={handleChange} /> Can Create</label>
      <label><input type="checkbox" name="canRead" checked={!!form.canRead} onChange={handleChange} /> Can Read</label>
      <label><input type="checkbox" name="canUpdate" checked={!!form.canUpdate} onChange={handleChange} /> Can Update</label>
      <label><input type="checkbox" name="canDelete" checked={!!form.canDelete} onChange={handleChange} /> Can Delete</label>
      <button type="submit" disabled={isPending}>Create</button>
      {isError && <div>Error creating</div>}
      {isSuccess && <div>Created successfully</div>}
    </form>
  );
};

export default CreateGroupCaseQueuePermissionJuntion;
