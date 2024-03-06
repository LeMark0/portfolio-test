import { LineChart } from '../../../components/LineChart'
import { usePortfolio } from '../hooks/usePortfolio.ts'
import { useMemo } from 'react'
import { usePrices } from '../hooks/usePrices.ts'
import { groupBy, sum, uniq } from 'lodash'
import { ChartPerformance } from '../../../components/ChartPerformance'
import { formatDateToYYYYMMDD } from '../../../helpers/date.ts'
import { AssetType } from '../../../constants/tickers.ts'
import { groupAssetsByType } from '../../../helpers/assets.ts'
import { Asset } from '../../../api/rest.ts'
import { Spinner } from 'flowbite-react'

type Props = {
  assetType?: AssetType
  dateFrom?: Date
  dateTo?: Date
}

export const History = ({ assetType, dateFrom, dateTo }: Props) => {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
  } = usePortfolio()

  const portfolioAssets = useMemo(() => {
    return portfolio?.positions.map((position) => position.asset)
  }, [portfolio?.positions])

  const {
    data: prices,
    isLoading: arePricesLoading,
    isError: isPriceError,
  } = usePrices({
    assets: portfolioAssets,
    from: dateFrom ? formatDateToYYYYMMDD(dateFrom) : undefined,
    to: dateTo ? formatDateToYYYYMMDD(dateTo) : undefined,
  })

  const assetGrouped = useMemo(
    () => groupAssetsByType(portfolio?.positions ?? []),
    [portfolio?.positions],
  )

  const labels = useMemo(() => uniq(prices?.map((price) => price.date)), [prices])
  const dataset = useMemo(() => {
    const filteredTickers = assetType
      ? assetGrouped[assetType].map((asset: Asset) => asset.asset)
      : []

    const valuesFilteredByType =
      assetType && prices
        ? prices.filter((price) => filteredTickers.includes(price.asset))
        : prices
    const valuesGroupedByDate = groupBy(valuesFilteredByType, (price) => price.date)

    return {
      label: assetType ?? 'Total value',
      values: portfolio
        ? Object.values(valuesGroupedByDate).map((group) => {
            const assetsValues = group.map(
              (asset) =>
                asset.price *
                  portfolio.positions.find((position) => position.asset === asset.asset)
                    ?.quantity ?? 0,
            )

            return sum(assetsValues)
          })
        : [],
    }
  }, [assetGrouped, assetType, portfolio, prices])

  const performanceAmount = useMemo(() => {
    const baseValue = dataset.values[0]
    const resultValue = dataset.values[dataset.values.length - 1]

    return ((resultValue - baseValue) / baseValue) * 100
  }, [dataset.values])

  const isLoading = isPortfolioLoading || arePricesLoading

  if (isPortfolioError || isPriceError) {
    return <div className="text-red-600">Couldn't load data</div>
  }

  return (
    <div>
      <ChartPerformance label={assetType ?? 'All assets'} amount={performanceAmount} />
      {isLoading ? (
        <div className="flex justify-center align-middle">
          <Spinner size="xl" />
        </div>
      ) : (
        <LineChart labels={labels} datasets={[dataset]} />
      )}
    </div>
  )
}
