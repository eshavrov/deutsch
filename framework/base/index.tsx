import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import * as React from "react";
import { Fetcher } from "./utils/types";

const Base = createContext<BaseContextValue | {}>({});

export type BaseProps = {
  children?: ReactNode;
  config: BaseConfig;
};

export type BaseConfig = { fetcher: Fetcher<any> } & Omit<
  BaseContextValue,
  "fetcherRef"
>;

export type BaseContextValue = {
  fetcherRef: MutableRefObject<Fetcher<any>>;
  locale: string;
  cartCookie: string;
};

export function BaseProvider({ children, config }: BaseProps) {
  if (!config) {
    throw new Error("BaseProvider requires a valid config object");
  }

  const fetcherRef = useRef(config.fetcher);
  // Because the config is an object, if the parent re-renders this provider
  // will re-render every consumer unless we memoize the config
  const cfg = useMemo(
    () => ({
      fetcherRef,
      locale: config.locale,
      cartCookie: config.cartCookie,
    }),
    [config.locale, config.cartCookie]
  );

  return <Base.Provider value={cfg}>{children}</Base.Provider>;
}

export function useBase<T extends BaseContextValue>() {
  return useContext(Base) as T;
}
