type Props = {
  label: string
  amount?: number
}

export const ChartTitle = ({ label, amount }: Props) => {
  const formattedNumber = amount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    : undefined

  return (
    <div className="flex">
      <div>{label}</div>
      {amount ? <div>: {formattedNumber}</div> : null}
    </div>
  )
}
