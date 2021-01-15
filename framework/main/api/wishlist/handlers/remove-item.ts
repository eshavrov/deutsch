import getUserId from "../../operations/get-user-id";
import getUserWishlist, { Wishlist } from "../../operations/get-user-wishlist";
import type { WishlistHandlers } from "..";

// Return current wishlist info
const removeItem: WishlistHandlers["removeItem"] = async ({
  res,
  body: { userToken, itemId },
  config,
}) => {
  const userId = userToken && (await getUserId({ userToken, config }));
  const { wishlist } =
    (userId &&
      (await getUserWishlist({
        variables: { userId },
        config,
      }))) ||
    {};

  if (!wishlist || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: "Invalid request" }],
    });
  }

  const result = await config.storeApiFetch<{ data: Wishlist } | null>(
    `/v3/wishlists/${wishlist.id}/items/${itemId}`,
    { method: "DELETE" }
  );
  const data = result?.data ?? null;

  res.status(200).json({ data });
};

export default removeItem;
