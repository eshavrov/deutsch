import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { MainConfig, getConfig } from "..";

export type MainApiHandler<
  T = any,
  H extends MainHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<MainApiResponse<T>>,
  config: MainConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>;

export type MainHandler<T = any, Body = null> = (options: {
  req: NextApiRequest;
  res: NextApiResponse<MainApiResponse<T>>;
  config: MainConfig;
  body: Body;
}) => void | Promise<void>;

export type MainHandlers<T = any> = {
  [k: string]: MainHandler<T, any>;
};

export type MainApiResponse<T> = {
  data: T | null;
  errors?: { message: string; code?: string }[];
};

export default function createApiHandler<
  T = any,
  H extends MainHandlers = {},
  Options extends {} = {}
>(
  handler: MainApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: MainConfig;
    operations?: Partial<H>;
    options?: Options extends {} ? Partial<Options> : never;
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers };
    const opts = { ...defaultOptions, ...options };

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts);
    };
  };
}
