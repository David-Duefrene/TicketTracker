import { useGetApiGroups } from '../../../api/groups';

import SelectableList from '../../../components/ItemList/SelectableList';

const GetGroups = () => {
    const { data } = useGetApiGroups();

    if (!data?.data)
        throw new Error('No group data found');

    const groups = data.data;

    return (
        <div>
            <h2>Groups List</h2>
            <SelectableList
                items={groups.map(group => group.name)}
            />
        </div>
    );
};

export default GetGroups;