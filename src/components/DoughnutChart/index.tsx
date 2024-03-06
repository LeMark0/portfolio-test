import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

type Props = {
  labels: string[]
  values: number[]
}

export const DoughnutChart = ({ values, labels }: Props) => {
  const data = {
    labels,
    tooltip: {
      callback: (values) => 'kek',
    },
    datasets: [
      {
        label: 'Value',
        data: values,
        backgroundColor: [
          '#728CA7',
          '#B9DCF0',
          '#68C6E3',
          '#29A1C5',
          '#00668A',
          '#00BBB5',
          '#80E7EE',
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="container">
      <Doughnut data={data} />
    </div>
  )
}
