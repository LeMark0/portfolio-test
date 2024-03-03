import { useQuery } from '@tanstack/react-query'
import { getPortfolio } from '../../api/rest.ts'
import { DoughnutChart } from '../DoughnutChart/DoughnutChart.tsx'

export const Portfolio = () => {
  const { isPending, data } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => getPortfolio({ asOf: '2023-04-02' }),
  })

  console.log('data: ', data)

  return (
    <div className="container">
      <DoughnutChart />
    </div>
  )
}
