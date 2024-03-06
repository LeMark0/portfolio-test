// Mock data for testing
import { Asset } from '../../api/rest.ts'
import { groupAssetsByType } from '../assets.ts'
import { AssetType, Ticker } from '../../constants/tickers.ts'

const mockAssets: Asset[] = [
  { asset: Ticker.APPL, quantity: 10, price: 150, value: 1500 },
  { asset: Ticker.GOOG, quantity: 5, price: 2800, value: 14000 },
  { asset: Ticker.BTC, quantity: 2, price: 16000, value: 32000 },
  { asset: Ticker.EUR, quantity: 1000, price: 1.1, value: 1100 },
]

describe('groupAssetsByType', () => {
  it('should correctly group assets by their types', () => {
    const groupedAssets = groupAssetsByType(mockAssets)

    expect(groupedAssets).toHaveProperty(AssetType.Stocks)
    expect(groupedAssets).toHaveProperty(AssetType.Crypto)
    expect(groupedAssets).toHaveProperty(AssetType.Cash)

    expect(groupedAssets[AssetType.Stocks]).toHaveLength(2) // APPL and GOOG
    expect(groupedAssets[AssetType.Crypto]).toHaveLength(1) // BTC
    expect(groupedAssets[AssetType.Cash]).toHaveLength(1) // EUR

    // Further assertions can be made to verify the contents of each group
    expect(groupedAssets[AssetType.Stocks][0].asset).toBe('APPL')
    expect(groupedAssets[AssetType.Stocks][1].asset).toBe('GOOG')
    expect(groupedAssets[AssetType.Crypto][0].asset).toBe('BTC')
    expect(groupedAssets[AssetType.Cash][0].asset).toBe('EUR')
  })
})
