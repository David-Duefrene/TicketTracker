export type ApiHookResult<TData> = {
  data?: TData;
  isLoading: boolean;
  error?: unknown;
};

export function Api<
    TData,
    THook extends () => ApiHookResult<TData>
  >(hook: THook): TData;

export function Api<
    TData, 
    TParams,
    THook extends (params: TParams) => ApiHookResult<TData>
  >(
  hook: THook,
  params: TParams,
): TData;

export function Api(): never {
  throw new Error("Api is a compile-time macro only");
}
