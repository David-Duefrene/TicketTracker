import { useGetApiGroupCaseQueuePermissionJuntionsId } from '../../../api/group-case-queue-permission-juntions';

import type { GroupCaseQueuePermissionJuntion } from '../../../api/model/groupCaseQueuePermissionJuntion';

interface Props {
  id: number;
}

const ViewGroupCaseQueuePermissionJuntion: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = useGetApiGroupCaseQueuePermissionJuntionsId(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data?.data) return <div>No data found</div>;

  const item: GroupCaseQueuePermissionJuntion = data.data;

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
