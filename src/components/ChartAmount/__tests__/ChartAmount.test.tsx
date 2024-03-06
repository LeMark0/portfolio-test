import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ChartAmount } from '../index.tsx'

describe('ChartAmount Component', () => {
  it('should render the label and formatted amount correctly', () => {
    render(<ChartAmount label="Total" amount={1234.56} />)
    const labelElement = screen.getByText('Total:')
    expect(labelElement).toBeInTheDocument()

    const amountElement = screen.getByText('$1,234.56')
    expect(amountElement).toBeInTheDocument()
  })

  it('should render the label only when amount is undefined', () => {
    render(<ChartAmount label="Total" />)
    expect(screen.getByText('Total:')).toBeInTheDocument()
    expect(screen.queryByText('$')).not.toBeInTheDocument()
  })

  it('should render the label only when amount is 0, showing formatted $0.00', () => {
    render(<ChartAmount label="Total" amount={0} />)
    expect(screen.getByText('Total:')).toBeInTheDocument()
    expect(screen.queryByText(/0/)).not.toBeInTheDocument()
  })
})
