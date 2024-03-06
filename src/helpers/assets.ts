import { Asset } from '../api/rest.ts'
import { assetGroups, AssetType } from '../constants/tickers.ts'

export function groupAssetsByType(assets: Asset[]): Record<AssetType, Asset[]> {
  return assets.reduce<Record<AssetType, Asset[]>>(
    (acc, asset) => {
      const assetType = Object.keys(assetGroups).find((type) =>
        assetGroups[type as AssetType].includes(asset.asset),
      ) as AssetType

      if (!acc[assetType]) {
        acc[assetType] = []
      }
      acc[assetType].push(asset)

      return acc
    },
    {} as Record<AssetType, Asset[]>,
  )
}
