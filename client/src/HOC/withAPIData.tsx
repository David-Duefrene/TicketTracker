type ApiHookResult<TData> = {
  data?: TData;
  isLoading: boolean;
  error?: unknown;
  // ...other react-query fields if needed
};

export function withApiData<TData, TProps>(
  useApiHook: () => ApiHookResult<TData>,
) {
  return function <P extends TProps>(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: Omit<P, keyof TProps>) {
      const apiResult = useApiHook();
      const mappedProps = {
        data: apiResult?.data ?? [],
        isLoading: apiResult.isLoading,
        error: apiResult.error,
      };
      return <Component {...(props as P)} {...mappedProps} />;
    };
  };
}