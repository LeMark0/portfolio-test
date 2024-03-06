import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { chartColors } from '../../constants/charts.ts'

Chart.register(ArcElement, Tooltip, Legend)

type Props = {
  labels: string[]
  values: number[]
}

export const DoughnutChart = ({ values, labels }: Props) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Value',
        data: values,
        backgroundColor: chartColors,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        // maintainAspectRatio: true,
        // aspectRatio: 2,
      }}
    />
  )
}
