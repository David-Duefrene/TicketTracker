import type React from 'react';

import { useGetApiGroups } from '../../../api/groups';

import SelectableList from '../../../components/ItemList/SelectableList';

type GetGroupsProps = {
  onSelect?: ((e: React.FormEvent) => void)
};

const GetGroups: React.FC<GetGroupsProps> = ({ onSelect }) => {
  const { data } = useGetApiGroups();
  if (!data?.data) throw new Error('No group data found');
  const groups = data.data; 

  return (
    <div>
      <h2>Groups List</h2>
      <SelectableList
        items={groups.map(group => group.name as string)}
        onSelect={onSelect}
      />
    </div>
  );
};

export default GetGroups;
