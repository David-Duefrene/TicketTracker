import { useGetApiGroupsId } from '../../../api/groups';

interface Props {
  id: number;
}

const UserGroupDetail: React.FC<Props> = ({ id }) => {
  const { data } = useGetApiGroupsId(id);

  const ug = data?.data;
  if (!ug) throw new Error('User group not found');

  return (
    <div>
      <h2>User Group Detail</h2>
      <div>ID: {ug.id}</div>
      <div>Group Name: {ug.name}</div>
    </div>
  );
};

export default UserGroupDetail;
