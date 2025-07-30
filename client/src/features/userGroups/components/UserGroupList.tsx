import { useGetApiGroups } from '../../../api/groups';

const UserGroupList: React.FC = () => {
  const { data } = useGetApiGroups();

  return (
    <div>
      <h2>User Groups</h2>
      <ul>
        {data?.data?.map((ug) => (
          <li key={ug.id}>
            ID: {ug.id}, Group: {ug.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGroupList;
