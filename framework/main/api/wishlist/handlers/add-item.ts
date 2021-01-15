import type { WishlistHandlers } from '..'
import getUserId from '../../operations/get-user-id'
import getUserWishlist from '../../operations/get-user-wishlist'
import { parseWishlistItem } from '../../utils/parse-item'

// Returns the wishlist of the signed user
const addItem: WishlistHandlers['addItem'] = async ({
  res,
  body: { userToken, item },
  config,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const userId =
    userToken && (await getUserId({ userToken, config }))

  if (!userId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const { wishlist } = await getUserWishlist({
    variables: { userId },
    config,
  })
  const options = {
    method: 'POST',
    body: JSON.stringify(
      wishlist
        ? {
            items: [parseWishlistItem(item)],
          }
        : {
            name: 'Wishlist',
            user_id: userId,
            items: [parseWishlistItem(item)],
            is_public: false,
          }
    ),
  }

  const { data } = wishlist
    ? await config.storeApiFetch(`/v3/wishlists/${wishlist.id}/items`, options)
    : await config.storeApiFetch('/v3/wishlists', options)

  res.status(200).json({ data })
}

export default addItem
