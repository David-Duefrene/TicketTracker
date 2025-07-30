import { useGetApiGroupCaseQueuePermissionJuntions } from '../../../api/group-case-queue-permission-juntions';

import SelectableList from '../../../components/ItemList/SelectableList';

import type { GroupCaseQueuePermissionJuntion } from '../../../api/model/groupCaseQueuePermissionJuntion';

const ListGroupCaseQueuePermissionJuntion: React.FC = () => {
  const { data } = useGetApiGroupCaseQueuePermissionJuntions();
  
  if (!data?.data) throw new Error('No group case queue permission juntion data found');

  const junctions = data.data;

  return (
    <div>
      <h2>Group Case Queue Permission Juntion List</h2>
      <SelectableList
        items={junctions.map((junction: GroupCaseQueuePermissionJuntion) => 
          (`Group: ${junction.group?.name}, Queue: ${junction.ticketQueue?.name}, Create: ${junction.canCreate ? 'Yes' : 'No'}, Read: ${junction.canRead ? 'Yes' : 'No'}, Update: ${junction.canUpdate ? 'Yes' : 'No'}, Delete: ${junction.canDelete ? 'Yes' : 'No'}`
        ))}
      />
    </div>
  );
};

export default ListGroupCaseQueuePermissionJuntion;
