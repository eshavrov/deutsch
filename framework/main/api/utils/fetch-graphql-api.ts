import { FetcherError } from "@base/utils/errors";
import type { GraphQLFetcher } from "@base/api";
import { getConfig } from "..";
import fetch from "./fetch";

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables, preview } = {},
  fetchOptions
) => {
  // log.warn(query)
  const config = getConfig();

  const res = await fetch(config.apiUrl + (preview ? "/preview" : ""), {
    ...fetchOptions,
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      ...fetchOptions?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: "Failed to fetch API" }],
      status: res.status,
    });
  }

  return { data: json.data, res };
};

export default fetchGraphqlApi;
