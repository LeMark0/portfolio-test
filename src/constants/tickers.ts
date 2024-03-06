export enum Ticker {
  APPL = 'APPL',
  GOOG = 'GOOG',
  GBP = 'GBP',
  EUR = 'EUR',
  BTC = 'BTC',
  ETH = 'ETH',
  MSFT = 'MSFT',
  TSLA = 'TSLA',
}

export enum AssetType {
  'Cash' = 'Cash',
  'Crypto' = 'Crypto',
  'Stocks' = 'Stocks',
}

export const assetGroups = {
  [AssetType.Cash]: [Ticker.EUR, Ticker.GBP],
  [AssetType.Crypto]: [Ticker.BTC, Ticker.ETH],
  [AssetType.Stocks]: [Ticker.APPL, Ticker.GOOG, Ticker.MSFT, Ticker.TSLA],
}
