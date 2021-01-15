import { useCallback } from 'react'
import type { HookFetcher } from '@base/utils/types'
import useBaseLogout from '@base/use-logout'
import useUser from './use-user'

const defaultOpts = {
  url: '/api/main/users/logout',
  method: 'GET',
}

export const fetcher: HookFetcher<null> = (options, _, fetch) => {
  return fetch({
    ...defaultOpts,
    ...options,
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useLogout = () => {
    const { mutate } = useUser()
    const fn = useBaseLogout<null>(defaultOpts, customFetcher)

    return useCallback(
      async function login() {
        const data = await fn(null)
        await mutate(null, false)
        return data
      },
      [fn]
    )
  }

  useLogout.extend = extendHook

  return useLogout
}

export default extendHook(fetcher)
