import { useCallback } from "react";
import type { HookFetcher } from "@base/utils/types";
import { BaseError } from "@base/utils/errors";
import useBaseLogin from "@base/use-login";
import type { LoginBody } from "./api/users/login";
import useUser from "./use-user";

const defaultOpts = {
  url: "/api/main/users/login",
  method: "POST",
};

export type LoginInput = LoginBody;

export const fetcher: HookFetcher<null, LoginBody> = (
  options,
  { email, password },
  fetch
) => {
  if (!(email && password)) {
    throw new BaseError({
      message: "Для входа требуются адрес электронной почты и пароль",
    });
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { email, password },
  });
};

export function extendHook(customFetcher: typeof fetcher) {
  const useLogin = () => {
    const { revalidate } = useUser();
    const fn = useBaseLogin<null, LoginInput>(defaultOpts, customFetcher);

    return useCallback(
      async function login(input: LoginInput) {
        const data = await fn(input);
        await revalidate();
        return data;
      },
      [fn]
    );
  };

  useLogin.extend = extendHook;

  return useLogin;
}

export default extendHook(fetcher);
