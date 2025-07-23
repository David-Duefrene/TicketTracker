import { useGetApiGroupCaseQueuePermissionJuntions } from '../../../api/group-case-queue-permission-juntions';

import type { GroupCaseQueuePermissionJuntion } from '../../../api/model/groupCaseQueuePermissionJuntion';

const ListGroupCaseQueuePermissionJuntion: React.FC = () => {
  const { data, isLoading, error } = useGetApiGroupCaseQueuePermissionJuntions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Group Case Queue Permission Juntion List</h2>
      <ul>
        {data?.data?.map((item: GroupCaseQueuePermissionJuntion) => (
          <li key={item.id}>
            ID: {item.id}, Group: {item.group?.name}, Queue: {item.ticketQueue?.name},
            Create: {item.canCreate ? 'Yes' : 'No'}, Read: {item.canRead ? 'Yes' : 'No'},
            Update: {item.canUpdate ? 'Yes' : 'No'}, Delete: {item.canDelete ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroupCaseQueuePermissionJuntion;
