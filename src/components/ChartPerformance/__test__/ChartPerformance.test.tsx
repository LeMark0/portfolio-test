import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ChartPerformance } from '../index.tsx'

describe('ChartPerformance Component', () => {
  it('should correctly display a positive amount with a "+" sign and in emerald color', () => {
    render(<ChartPerformance label="Profit" amount={5.23} />)

    expect(screen.getByText('Profit:')).toBeInTheDocument()
    const amountElement = screen.getByText(/\+5.23%/)
    expect(amountElement).toBeInTheDocument()
  })

  it('should correctly display a negative amount in red color', () => {
    render(<ChartPerformance label="Loss" amount={-2.48} />)

    expect(screen.getByText('Loss:')).toBeInTheDocument()
    const amountElement = screen.getByText(/-2.48%/)
    expect(amountElement).toBeInTheDocument()
  })

  it('should render the label correctly even when amount is 0', () => {
    render(<ChartPerformance label="Break Even" amount={0} />)

    expect(screen.getByText('Break Even:')).toBeInTheDocument()
    const amountElement = screen.getByText(/0.00%/)
    expect(amountElement).toBeInTheDocument()
  })
})
