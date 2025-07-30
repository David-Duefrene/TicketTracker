import { useGetApiGroupCaseQueuePermissionJuntionsId } from '../../../api/group-case-queue-permission-juntions';

interface Props {
  id: number;
}

const ViewGroupCaseQueuePermissionJuntion: React.FC<Props> = ({ id }) => {
  const { data } = useGetApiGroupCaseQueuePermissionJuntionsId(id);

  if (!data?.data) throw new Error('No group case queue permission juntion data found');

  const item = data.data;

  return (
    <div>
      <h2>Group Case Queue Permission Juntion Details</h2>
      <div>ID: {item.id}</div>
      <div>Group: {item.group?.name}</div>
      <div>Queue: {item.ticketQueue?.name}</div>
      <div>Can Create: {item.canCreate ? 'Yes' : 'No'}</div>
      <div>Can Read: {item.canRead ? 'Yes' : 'No'}</div>
      <div>Can Update: {item.canUpdate ? 'Yes' : 'No'}</div>
      <div>Can Delete: {item.canDelete ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default ViewGroupCaseQueuePermissionJuntion;
