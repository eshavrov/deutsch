import type { HookFetcher } from "@base/utils/types";
import type { SwrOptions } from "@base/utils/use-data";
import useBaseCart, { CartInput } from "@base/cart/use-cart";
import type { Cart } from "../api/cart";

const defaultOpts = {
  url: "/api/main/cart",
  method: "GET",
};

export type { Cart };

export const fetcher: HookFetcher<Cart | null, CartInput> = (
  options,
  { cartId },
  fetch
) => {
  return cartId ? fetch({ ...defaultOpts, ...options }) : null;
};

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Cart | null, CartInput>
) {
  const useCart = () => {
    const response = useBaseCart(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    });

    // Uses a getter to only calculate the prop when required
    // response.data is also a getter and it's better to not trigger it early
    Object.defineProperty(response, "isEmpty", {
      get() {
        return Object.values(response.data?.line_items ?? {}).every(
          (items) => !items.length
        );
      },
      set: (x) => x,
    });

    return response;
  };

  useCart.extend = extendHook;

  return useCart;
}

export default extendHook(fetcher);
