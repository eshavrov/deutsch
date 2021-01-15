import { useCallback } from "react";
import type { HookFetcher } from "@base/utils/types";
import { BaseError } from "@base/utils/errors";
import useBaseSignup from "@base/use-signup";
import type { SignupBody } from "./api/users/signup";
import useUser from "./use-user";

const defaultOpts = {
  url: "/api/main/users/signup",
  method: "POST",
};

export type SignupInput = SignupBody;

export const fetcher: HookFetcher<null, SignupBody> = (
  options,
  { firstName, lastName, email, password },
  fetch
) => {
  if (!(firstName && lastName && email && password)) {
    throw new BaseError({
      message:
        "Для регистрации необходимы имя, фамилия, адрес электронной почты и пароль",
    });
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { firstName, lastName, email, password },
  });
};

export function extendHook(customFetcher: typeof fetcher) {
  const useSignup = () => {
    const { revalidate } = useUser();
    const fn = useBaseSignup<null, SignupInput>(defaultOpts, customFetcher);

    return useCallback(
      async function signup(input: SignupInput) {
        const data = await fn(input);
        await revalidate();
        return data;
      },
      [fn]
    );
  };

  useSignup.extend = extendHook;

  return useSignup;
}

export default extendHook(fetcher);
