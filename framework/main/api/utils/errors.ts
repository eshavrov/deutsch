import type { Response } from "@vercel/fetch";

// Used for GraphQL errors
export class MainGraphQLError extends Error {}

export class MainApiError extends Error {
  status: number;
  res: Response;
  data: any;

  constructor(msg: string, res: Response, data?: any) {
    super(msg);
    this.name = "MainApiError";
    this.status = res.status;
    this.res = res;
    this.data = data;
  }
}

export class MainNetworkError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "MainNetworkError";
  }
}
