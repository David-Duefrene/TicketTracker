import { useGetApiGroups } from '../../../api/groups';

const GetGroups = () => {
  const { data, isLoading, error } = useGetApiGroups();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading groups.</div>;

  return (
    <div>
      <h2>Groups List</h2>
      <ul>
        {data?.data?.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetGroups;
