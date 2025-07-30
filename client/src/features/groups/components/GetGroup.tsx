import { useGetApiGroupsId } from '../../../api/groups';

interface GetGroupProps {
  id: number;
}

const GetGroup = ({ id }: GetGroupProps) => {
  const { data } = useGetApiGroupsId(id, {});

  return (
    <div>
      <h2>Group Details</h2>
      <div>ID: {data?.data?.id}</div>
      <div>Name: {data?.data?.name}</div>
    </div>
  );
};

export default GetGroup;
