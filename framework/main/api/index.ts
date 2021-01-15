import type { RequestInit } from '@vercel/fetch'
import type { BaseAPIConfig } from '@base/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'

export interface MainConfig extends BaseAPIConfig {
  // Indicates if the returned metadata with translations should be applied to the
  // data or returned as it is
  applyLocale?: boolean
  storeApiUrl: string
  storeApiToken: string
  storeApiClientId: string
  storeChannelId?: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.FRONT_API_URL
const API_TOKEN = process.env.FRONT_API_TOKEN
const MAIN_API_URL = process.env.API_URL
const MAIN_API_TOKEN = process.env.API_TOKEN
const MAIN_API_CLIENT_ID = process.env.API_CLIENT_ID
const MAIN_CHANNEL_ID = process.env.CHANNEL_ID

if (!API_URL) {
  throw new Error(
    `The environment variable FRONT_API_URL is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable FRONT_API_TOKEN is missing and it's required to access your store`
  )
}

if (!(MAIN_API_URL && MAIN_API_TOKEN && MAIN_API_CLIENT_ID)) {
  throw new Error(
    `The environment variables API_URL, API_TOKEN, API_CLIENT_ID have to be set in order to access the REST API of your store`
  )
}

export class Config {
  private config: MainConfig

  constructor(config: Omit<MainConfig, 'userCookie'>) {
    this.config = {
      ...config,
      // The userCookie is not customizable for now, BC sets the cookie and it's
      // not important to rename it
      userCookie: 'SHOP_TOKEN',
    }
  }

  getConfig(userConfig: Partial<MainConfig> = {}) {
    return Object.entries(userConfig).reduce<MainConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<MainConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  apiUrl: API_URL,
  apiToken: API_TOKEN,
  cartCookie: process.env.CART_COOKIE ?? 'bc_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  applyLocale: true,
  // REST API only
  storeApiUrl: MAIN_API_URL,
  storeApiToken: MAIN_API_TOKEN,
  storeApiClientId: MAIN_API_CLIENT_ID,
  storeChannelId: MAIN_CHANNEL_ID,
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<MainConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<MainConfig>) {
  return config.setConfig(newConfig)
}
