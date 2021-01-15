import type { HookFetcher } from "@base/utils/types";
import type { SwrOptions } from "@base/utils/use-data";
import useBaseUser from "@base/use-user";
import type { User, UserData } from "./api/users";

const defaultOpts = {
  url: "/api/main/users",
  method: "GET",
};

export type { User };

export const fetcher: HookFetcher<User | null> = async (
  options,
  _,
  fetch
) => {
  const data = await fetch<UserData | null>({ ...defaultOpts, ...options });

  return data?.user ?? null;
};

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<User | null>
) {
  const useUser = () => {
    return useBaseUser(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    });
  };

  useUser.extend = extendHook;

  return useUser;
}

export default extendHook(fetcher);
