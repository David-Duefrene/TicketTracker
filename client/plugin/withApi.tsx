import { ApiHookResult } from "./Api";

export function withApiData<TData, TProps>(
  useApiHook: () => ApiHookResult<TData>,
  mapToProps?: (result: ApiHookResult<TData>) => TProps
) {
  return function <P extends TProps>(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: Omit<P, keyof TProps>) {
      const apiResult = useApiHook();
      const mappedProps = mapToProps ? mapToProps(apiResult) : {
        tickets: apiResult?.data?.data ?? [],
      };
      return <Component {...(props as P)} {...mappedProps} />;
    };
  };
}