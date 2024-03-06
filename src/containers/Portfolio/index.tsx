import { useQuery } from '@tanstack/react-query'
import { getPortfolio } from '../../api/rest.ts'
import { DoughnutChart } from '../DoughnutChart/DoughnutChart.tsx'
import { useMemo } from 'react'
import { Tabs } from '../Tabs'

export const Portfolio = () => {
  const { isPending, data } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => getPortfolio({ asOf: '2023-04-02' }),
  })

  console.log('data: ', data)

  const values = useMemo(
    () => data?.positions?.map((v) => v.value) ?? [],
    [data?.positions],
  )

  const labels = useMemo(
    () => data?.positions?.map((v) => v.asset) ?? [],
    [data?.positions],
  )

  console.log('labels: ', labels)

  return (
    <div className="container flex justify-center">
      <Tabs />
      <DoughnutChart values={values} labels={labels} />
    </div>
  )
}
