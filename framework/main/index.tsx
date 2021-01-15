import { ReactNode } from "react";
import * as React from "react";
import {
  BaseConfig,
  BaseProvider as CoreBaseProvider,
  useBase as useCoreBase,
} from "@base";
import { FetcherError } from "@base/utils/errors";

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText;
  } catch (error) {
    return res.statusText;
  }
}

async function getError(res: Response) {
  if (res.headers.get("Content-Type")?.includes("application/json")) {
    const data = await res.json();
    return new FetcherError({ errors: data.errors, status: res.status });
  }
  return new FetcherError({ message: await getText(res), status: res.status });
}

export const baseConfig: BaseConfig = {
  locale: "en-us",
  cartCookie: "bc_cartId",
  async fetcher({ url, method = "GET", variables, body: bodyObj }) {
    const hasBody = Boolean(variables || bodyObj);
    const body = hasBody
      ? JSON.stringify(variables ? { variables } : bodyObj)
      : undefined;
    const headers = hasBody
      ? { "Content-Type": "application/json" }
      : undefined;
    const res = await fetch(url!, { method, body, headers });

    if (res.ok) {
      const { data } = await res.json();
      return data;
    }

    throw await getError(res);
  },
};

export type MainConfig = Partial<BaseConfig>;

export type MainProps = {
  children?: ReactNode;
  locale: string;
} & MainConfig;

export function BaseProvider({ children, ...config }: MainProps) {
  return (
    <CoreBaseProvider config={{ ...baseConfig, ...config }}>
      {children}
    </CoreBaseProvider>
  );
}

export const useBase = () => useCoreBase();
