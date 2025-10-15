import React from 'react';
import { useGetApiTickets } from '../../../api/tickets';
import type { Ticket } from '../../../api/model';



type ApiHookResult<TData> = {
  data?: TData;
  isLoading: boolean;
  error?: unknown;
  // ...other react-query fields if needed
};

export function withApiData<TData, TProps>(
  useApiHook: () => ApiHookResult<TData>,
  mapToProps: (result: ApiHookResult<TData>) => TProps
) {
  return function <P extends TProps>(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: Omit<P, keyof TProps>) {
      const apiResult = useApiHook();
      const mappedProps = mapToProps(apiResult);
      return <Component {...(props as P)} {...mappedProps} />;
    };
  };
}



export const TicketList = ({ tickets }: { tickets?: Ticket[]; }) => {
  console.log(tickets);
  if (tickets?.length === 0) return <div>No tickets found.</div>;

  return (
    <div>
      <ul>
        {tickets?.map(ticket => (
          <li key={ticket.id}>
            #{ticket.id}: {ticket.title} ({ticket.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapToProps = ({ data, isLoading, error }: ApiHookResult<{ data: Ticket[] }>) => ({
  tickets: data?.data ?? [],
  isLoading,
  error,
});

const comp = withApiData(useGetApiTickets, mapToProps)(TicketList);
export default comp;