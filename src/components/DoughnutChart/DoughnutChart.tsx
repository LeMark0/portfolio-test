import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement)

type Props = {}

export const DoughnutChart = (props: Props) => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
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
