import { useCallback } from "react";
import { HookFetcher } from "@base/utils/types";
import { BaseError } from "@base/utils/errors";
import useWishlistAddItem from "@base/wishlist/use-add-item";
import type { ItemBody, AddItemBody } from "../api/wishlist";
import useUser from "../use-user";
import useWishlist, { UseWishlistOptions, Wishlist } from "./use-wishlist";

const defaultOpts = {
  url: "/api/main/wishlist",
  method: "POST",
};

export type AddItemInput = ItemBody;

export const fetcher: HookFetcher<Wishlist, AddItemBody> = (
  options,
  { item },
  fetch
) => {
  // TODO: add validations before doing the fetch
  return fetch({
    ...defaultOpts,
    ...options,
    body: { item },
  });
};

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = (opts?: UseWishlistOptions) => {
    const { data: user } = useUser();
    const { revalidate } = useWishlist(opts);
    const fn = useWishlistAddItem(defaultOpts, customFetcher);

    return useCallback(
      async function addItem(input: AddItemInput) {
        if (!user) {
          // A signed user is required in order to have a wishlist
          throw new BaseError({
            message: "Signed user not found",
          });
        }

        const data = await fn({ item: input });
        await revalidate();
        return data;
      },
      [fn, revalidate, user]
    );
  };

  useAddItem.extend = extendHook;

  return useAddItem;
}

export default extendHook(fetcher);
