import { useGetApiGroupsId } from '../../../api/groups';

interface GetGroupProps {
  id: number;
}

const GetGroup = ({ id }: GetGroupProps) => {
  const { data, error, isLoading } = useGetApiGroupsId(id, {});

  if (isLoading) return <div>Loading group...</div>;
  if (error) return <div>Error loading group</div>;

  return (
    <div>
      <h2>Group Details</h2>
      <div>ID: {data?.data?.id}</div>
      <div>Name: {data?.data?.name}</div>
    </div>
  );
};

export default GetGroup;
