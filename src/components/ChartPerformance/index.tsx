type Props = {
  label: string
  amount: number
}

export const ChartPerformance = ({ label, amount }: Props) => {
  const sign = amount > 0 ? '+' : ''
  const color = amount > 0 ? 'text-emerald-400' : 'text-red-500'
  
  return (
    <div className="flex items-center space-x-2">
      <div>{label}:</div>
      <div className="font-medium text-xl">
        <span className={color}>
          {sign}
          {(amount ?? 0).toFixed(2)}%
        </span>
      </div>
    </div>
  )
}
