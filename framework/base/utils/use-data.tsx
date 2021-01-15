import useSWR, { ConfigInterface, responseInterface } from "swr";
import type { HookInput, HookFetcher, HookFetcherOptions } from "./types";
import { BaseError } from "./errors";
import { useBase } from "..";

export type SwrOptions<Result, Input = null> = ConfigInterface<
  Result,
  BaseError,
  HookFetcher<Result, Input>
>;

export type UseData = <Result = any, Input = null>(
  options: HookFetcherOptions | (() => HookFetcherOptions | null),
  input: HookInput,
  fetcherFn: HookFetcher<Result, Input>,
  swrOptions?: SwrOptions<Result, Input>
) => responseInterface<Result, BaseError>;

const useData: UseData = (options, input, fetcherFn, swrOptions) => {
  const { fetcherRef } = useBase();
  const fetcher = async (
    url?: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    try {
      return await fetcherFn(
        { url, query, method },
        // Transform the input array into an object
        args.reduce((obj, val, i) => {
          obj[input[i][0]!] = val;
          return obj;
        }, {}),
        fetcherRef.current
      );
    } catch (error) {
      // SWR will not log errors, but any error that's not an instance
      // of BaseError is not welcomed by this hook
      if (!(error instanceof BaseError)) {
        console.error(error);
      }
      throw error;
    }
  };
  const response = useSWR(
    () => {
      const opts = typeof options === "function" ? options() : options;
      return opts
        ? [opts.url, opts.query, opts.method, ...input.map((e) => e[1])]
        : null;
    },
    fetcher,
    swrOptions
  );

  return response;
};

export default useData;
