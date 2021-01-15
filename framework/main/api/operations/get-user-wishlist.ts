import type { RecursivePartial, RecursiveRequired } from "../utils/types";
import { definitions } from "../definitions/wishlist";
import { MainConfig, getConfig } from "..";
import getAllProducts, { ProductEdge } from "./get-all-products";

export type Wishlist = Omit<definitions["wishlist_Full"], "items"> & {
  items?: WishlistItem[];
};

export type WishlistItem = NonNullable<
  definitions["wishlist_Full"]["items"]
>[0] & {
  product?: ProductEdge["node"];
};

export type GetUserWishlistResult<
  T extends { wishlist?: any } = { wishlist?: Wishlist }
> = T;

export type GetUserWishlistVariables = {
  userId: number;
};

async function getUserWishlist(opts: {
  variables: GetUserWishlistVariables;
  config?: MainConfig;
  includeProducts?: boolean;
}): Promise<GetUserWishlistResult>;

async function getUserWishlist<T extends { wishlist?: any }, V = any>(opts: {
  url: string;
  variables: V;
  config?: MainConfig;
  includeProducts?: boolean;
}): Promise<GetUserWishlistResult<T>>;

async function getUserWishlist({
  config,
  variables,
  includeProducts,
}: {
  url?: string;
  variables: GetUserWishlistVariables;
  config?: MainConfig;
  includeProducts?: boolean;
}): Promise<GetUserWishlistResult> {
  config = getConfig(config);

  const { data = [] } = await config.storeApiFetch<
    RecursivePartial<{ data: Wishlist[] }>
  >(`/v3/wishlists?user_id=${variables.userId}`);
  const wishlist = data[0];

  if (includeProducts && wishlist?.items?.length) {
    const entityIds = wishlist.items
      ?.map((item) => item?.product_id)
      .filter((id): id is number => !!id);

    if (entityIds?.length) {
      const graphqlData = await getAllProducts({
        variables: { first: 100, entityIds },
        config,
      });
      // Put the products in an object that we can use to get them by id
      const productsById = graphqlData.products.reduce<{
        [k: number]: ProductEdge;
      }>((prods, p) => {
        prods[p.node.entityId] = p;
        return prods;
      }, {});
      // Populate the wishlist items with the graphql products
      wishlist.items.forEach((item) => {
        const product = item && productsById[item.product_id!];
        if (item && product) {
          item.product = product.node;
        }
      });
    }
  }

  return { wishlist: wishlist as RecursiveRequired<typeof wishlist> };
}

export default getUserWishlist;
