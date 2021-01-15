import type { GetLoggedInUserQuery } from '../../../schema'
import type { UsersHandlers } from '..'

export const getLoggedInUserQuery = /* GraphQL */ `
  query getLoggedInUser {
    user {
      entityId
      firstName
      lastName
      email
      company
      userGroupId
      notes
      phone
      addressCount
      attributeCount
      storeCredit {
        value
        currencyCode
      }
    }
  }
`

export type User = NonNullable<GetLoggedInUserQuery['user']>

const getLoggedInUser: UsersHandlers['getLoggedInUser'] = async ({
  req,
  res,
  config,
}) => {
  const token = req.cookies[config.userCookie]

  if (token) {
    const { data } = await config.fetch<GetLoggedInUserQuery>(
      getLoggedInUserQuery,
      undefined,
      {
        headers: {
          cookie: `${config.userCookie}=${token}`,
        },
      }
    )
    const { user } = data

    if (!user) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'User not found', code: 'not_found' }],
      })
    }

    return res.status(200).json({ data: { user } })
  }

  res.status(200).json({ data: null })
}

export default getLoggedInUser
