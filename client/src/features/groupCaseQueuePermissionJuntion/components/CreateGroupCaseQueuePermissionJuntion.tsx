import { useState } from 'react';

import GetGroups from '../../groups/components/GetGroups';
import GetTicketQueues from '../../ticketQueue/components/GetTicketQueues';

import { usePostApiGroupCaseQueuePermissionJuntions } from '../../../api/group-case-queue-permission-juntions';

const CreateGroupCaseQueuePermissionJuntion: React.FC = () => {
  const [form, setForm] = useState({
    group: { name: '' },
    ticketQueue: { name: '' },
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
    name: ''
  });
  
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
    if (form.group.name === '' || form.ticketQueue.name === '') return alert('Please select a group and a queue');
    mutate({ data: form });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group Case Queue Permission Juntion</h2>
      <GetGroups onSelect={(e) => console.log('Group selected:', e)} />
      <GetTicketQueues onSelect={(e) => console.log('Ticket Queue selected:', e)} />
      <label><input type="checkbox" name="canCreate" checked={!!form.canCreate} onChange={handleChange} /> Can Create</label>
      <label><input type="checkbox" name="canRead" checked={!!form.canRead} onChange={handleChange} /> Can Read</label>
      <label><input type="checkbox" name="canUpdate" checked={!!form.canUpdate} onChange={handleChange} /> Can Update</label>
      <label><input type="checkbox" name="canDelete" checked={!!form.canDelete} onChange={handleChange} /> Can Delete</label>
      <label><input type="text" name="Name" value={form.name || ''} onChange={handleChange} placeholder="Name" /></label>
      <button type="submit" disabled={isPending}>Create</button>
      {isSuccess && <div>Created successfully</div>}
    </form>
  );
};

export default CreateGroupCaseQueuePermissionJuntion;
