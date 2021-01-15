import isAllowedMethod from "../utils/is-allowed-method";
import createApiHandler, {
  MainApiHandler,
  MainHandler,
} from "../utils/create-api-handler";
import { MainApiError } from "../utils/errors";
import type { Wishlist, WishlistItem } from "../operations/get-user-wishlist";
import getWishlist from "./handlers/get-wishlist";
import addItem from "./handlers/add-item";
import removeItem from "./handlers/remove-item";

export type { Wishlist, WishlistItem };

export type ItemBody = {
  productId: number;
  variantId: number;
};

export type AddItemBody = { item: ItemBody };

export type RemoveItemBody = { itemId: string };

export type WishlistBody = {
  user_id: number;
  is_public: number;
  name: string;
  items: any[];
};

export type AddWishlistBody = { wishlist: WishlistBody };

export type WishlistHandlers = {
  getWishlist: MainHandler<
    Wishlist,
    { userToken?: string; includeProducts?: boolean }
  >;
  addItem: MainHandler<Wishlist, { userToken?: string } & Partial<AddItemBody>>;
  removeItem: MainHandler<
    Wishlist,
    { userToken?: string } & Partial<RemoveItemBody>
  >;
};

const METHODS = ["GET", "POST", "DELETE"];

// TODO: a complete implementation should have schema validation for `req.body`
const wishlistApi: MainApiHandler<Wishlist, WishlistHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  const { cookies } = req;
  const userToken = cookies[config.userCookie];

  try {
    // Return current wishlist info
    if (req.method === "GET") {
      const body = {
        userToken,
        includeProducts: req.query.products === "1",
      };
      return await handlers["getWishlist"]({ req, res, config, body });
    }

    // Add an item to the wishlist
    if (req.method === "POST") {
      const body = { ...req.body, userToken };
      return await handlers["addItem"]({ req, res, config, body });
    }

    // Remove an item from the wishlist
    if (req.method === "DELETE") {
      const body = { ...req.body, userToken };
      return await handlers["removeItem"]({ req, res, config, body });
    }
  } catch (error) {
    console.error(error);

    const message =
      error instanceof MainApiError
        ? "An unexpected error ocurred with the API"
        : "An unexpected error ocurred";

    res.status(500).json({ data: null, errors: [{ message }] });
  }
};

export const handlers = {
  getWishlist,
  addItem,
  removeItem,
};

export default createApiHandler(wishlistApi, handlers, {});
