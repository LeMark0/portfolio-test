import { isEmpty } from 'lodash'
import { Ticker } from '../constants/tickers.ts'

const HOST = 'http://localhost:3000'

export type Asset = {
  asset: Ticker
  quantity: number
  price: number
  value: number
}

export type GetPortfolioOptions = {
  asOf?: string // date, example: 2023-04-01
}
export type GetPortfolioResponse = {
  asOf: string
  positions: Asset[]
}
export type GetPricesResponse = {
  asset: Ticker
  date: string
  price: number
}[]

export type GetPricesOptions = {
  assets?: Ticker[]
  asOf?: string // date
  from?: string // date
  to?: string // date
}

function prepareQueryParams(options?: object) {
  return isEmpty(options) ? '' : `?${new URLSearchParams(options).toString()}`
}

export const getAssets = async () => {
  const res = await fetch(`${HOST}/assets`)
  return await res.json()
}

export const getPrices = async (
  options?: GetPricesOptions,
): Promise<GetPricesResponse> => {
  const queryParams = prepareQueryParams(options)

  const res = await fetch(`${HOST}/prices${queryParams}`)
  return await res.json()
}

export const getPortfolio = async (
  options?: GetPortfolioOptions,
): Promise<GetPortfolioResponse> => {
  const queryParams = prepareQueryParams(options)

  const res = await fetch(`${HOST}/portfolios${queryParams}`)
  return await res.json()
}
