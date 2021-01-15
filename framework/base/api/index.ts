import type { RequestInit, Response } from "@vercel/fetch";

export interface BaseAPIConfig {
  locale?: string;
  apiUrl: string;
  apiToken: string;
  cartCookie: string;
  cartCookieMaxAge: number;
  userCookie: string;
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: BaseAPIFetchOptions<Variables>,
    fetchOptions?: RequestInit
  ): Promise<GraphQLFetcherResult<Data>>;
}

export type GraphQLFetcher<
  Data extends GraphQLFetcherResult = GraphQLFetcherResult,
  Variables = any
> = (
  query: string,
  queryData?: BaseAPIFetchOptions<Variables>,
  fetchOptions?: RequestInit
) => Promise<Data>;

export interface GraphQLFetcherResult<Data = any> {
  data: Data;
  res: Response;
}

export interface BaseAPIFetchOptions<Variables> {
  variables?: Variables;
  preview?: boolean;
}

// TODO: define interfaces for all the available operations and API endpoints
