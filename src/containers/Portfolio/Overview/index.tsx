import { DoughnutChart } from '../../../components/DoughnutChart'
import { useMemo } from 'react'
import { Spinner } from 'flowbite-react'
import { usePortfolio } from '../hooks/usePortfolio.ts'
import { AssetType } from '../../../constants/tickers.ts'
import { ChartAmount } from '../../../components/ChartAmount'
import { sum } from 'lodash'
import { formatDateToYYYYMMDD } from '../../../helpers/date.ts'
import { groupAssetsByType } from '../../../helpers/assets.ts'

type Props = {
  assetType?: AssetType
  date?: Date
}

export const Overview = ({ assetType, date }: Props) => {
  const {
    data,
    isLoading,
    isError: isPortfolioError,
  } = usePortfolio({
    asOf: date ? formatDateToYYYYMMDD(date) : undefined,
  })

  const assetGrouped = useMemo(
    () => groupAssetsByType(data?.positions ?? []),
    [data?.positions],
  )
  const groupLabels = Object.keys(assetGrouped)

  const values = useMemo(() => {
    if (assetType) {
      return assetGrouped[assetType]?.map((position) => position.value) ?? []
    }

    return groupLabels.map((key) =>
      assetGrouped[key as AssetType].reduce((acc, curr) => {
        acc += curr.value
        return acc
      }, 0),
    )
  }, [assetGrouped, assetType, groupLabels])

  const labels = useMemo(() => {
    if (assetType) {
      return assetGrouped[assetType]?.map((v) => v.asset) ?? []
    }

    return groupLabels
  }, [assetGrouped, assetType, groupLabels])

  const totalAmount = sum(values)

  if (isPortfolioError) {
    return <div className="text-red-600">Couldn't load data</div>
  }

  return (
    <div className="min-h-48">
      {!isLoading && (
        <ChartAmount label={assetType ?? 'All assets'} amount={totalAmount} />
      )}

      {isLoading ? (
        <div className="flex justify-center align-middle">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="relative md:max-h-[60vh] flex justify-center items-center">
          <DoughnutChart values={values} labels={labels} />
        </div>
      )}
    </div>
  )
}
