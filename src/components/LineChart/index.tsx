import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineControllerDatasetOptions,
  LineElement,
  PointElement,
  PointStyle,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { chartBgColors, chartColors } from '../../constants/charts.ts'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

export type Dataset = {
  label: string
  values: number[]
}

type Props = {
  labels: string[]
  datasets: Dataset[]
}

export const LineChart = ({ labels, datasets }: Props) => {
  const data = {
    labels: labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.values,
      borderColor: chartColors[index],
      backgroundColor: chartBgColors[index],
      yAxisID: `y-${index}`,
      cubicInterpolationMode:
        'monotone' as LineControllerDatasetOptions['cubicInterpolationMode'],
      tension: 0.4,
      fill: true,
      pointStyle: false as PointStyle,
      pointRadius: 10,
      pointHoverRadius: 15,
    })),
  }

  return (
    <Line
      data={data}
      options={{
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
            align: 'start',
          },
        },
      }}
    />
  )
}
