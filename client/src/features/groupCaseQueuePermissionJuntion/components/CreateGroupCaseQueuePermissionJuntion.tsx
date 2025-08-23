import { useState } from 'react';

import GetGroups from '../../groups/components/GetGroups';
import GetTicketQueues from '../../ticketQueue/components/GetTicketQueues';

import { usePostApiGroupCaseQueuePermissionJuntions } from '../../../api/group-case-queue-permission-juntions';

import type { GroupCaseQueuePermissionJuntion } from '../../../api/model/groupCaseQueuePermissionJuntion';

const CreateGroupCaseQueuePermissionJuntion: React.FC = () => {
  const [form, setForm] = useState<GroupCaseQueuePermissionJuntion>({ group: { name: '' }, ticketQueue: { name: '' } });
  const { mutate, isPending, isSuccess } = usePostApiGroupCaseQueuePermissionJuntions();

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
      <GetGroups />
      <GetTicketQueues />
      <label><input type="checkbox" name="canCreate" checked={!!form.canCreate} onChange={handleChange} /> Can Create</label>
      <label><input type="checkbox" name="canRead" checked={!!form.canRead} onChange={handleChange} /> Can Read</label>
      <label><input type="checkbox" name="canUpdate" checked={!!form.canUpdate} onChange={handleChange} /> Can Update</label>
      <label><input type="checkbox" name="canDelete" checked={!!form.canDelete} onChange={handleChange} /> Can Delete</label>
      <button type="submit" disabled={isPending}>Create</button>
      {isSuccess && <div>Created successfully</div>}
    </form>
  );
};

export default CreateGroupCaseQueuePermissionJuntion;
