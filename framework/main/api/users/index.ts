import createApiHandler, {
  MainApiHandler,
  MainHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { MainApiError } from '../utils/errors'
import getLoggedInUser, {
  User,
} from './handlers/get-logged-in-user'

export type { User }

export type UserData = {
  user: User
}

export type UsersHandlers = {
  getLoggedInUser: MainHandler<UserData>
}

const METHODS = ['GET']

const usersApi: MainApiHandler<
  UserData,
  UsersHandlers
> = async (req, res, config, handlers) => {
  console.log("!YUUP!");
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const body = null
    return await handlers['getLoggedInUser']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof MainApiError
        ? 'An unexpected error ocurred with the API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { getLoggedInUser }

export default createApiHandler(usersApi, handlers, {})
