type Props = {
  label: string
  amount?: number
}

export const ChartAmount = ({ label, amount }: Props) => {
  const formattedNumber = amount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    : undefined

  return (
    <div className="flex items-center space-x-2">
      <div>{label}:</div>
      {amount ? (
        <div className="text-slate-100 font-medium text-xl"> {formattedNumber}</div>
      ) : null}
    </div>
  )
}
