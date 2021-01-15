import { useCallback } from "react";
import { HookFetcher } from "@base/utils/types";
import { BaseError } from "@base/utils/errors";
import useWishlistRemoveItem from "@base/wishlist/use-remove-item";
import type { RemoveItemBody } from "../api/wishlist";
import useUser from "../use-user";
import useWishlist, { UseWishlistOptions, Wishlist } from "./use-wishlist";

const defaultOpts = {
  url: "/api/main/wishlist",
  method: "DELETE",
};

export type RemoveItemInput = {
  id: string | number;
};

export const fetcher: HookFetcher<Wishlist | null, RemoveItemBody> = (
  options,
  { itemId },
  fetch
) => {
  return fetch({
    ...defaultOpts,
    ...options,
    body: { itemId },
  });
};

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = (opts?: UseWishlistOptions) => {
    const { data: user } = useUser();
    const { revalidate } = useWishlist(opts);
    const fn = useWishlistRemoveItem<Wishlist | null, RemoveItemBody>(
      defaultOpts,
      customFetcher
    );

    return useCallback(
      async function removeItem(input: RemoveItemInput) {
        if (!user) {
          // A signed user is required in order to have a wishlist
          throw new BaseError({
            message: "Signed user not found",
          });
        }

        const data = await fn({ itemId: String(input.id) });
        await revalidate();
        return data;
      },
      [fn, revalidate, user]
    );
  };

  useRemoveItem.extend = extendHook;

  return useRemoveItem;
}

export default extendHook(fetcher);
