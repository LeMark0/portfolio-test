import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Filters } from '../index.tsx'
import { AssetType } from '../../../../constants/tickers.ts'

describe('Filters Component', () => {
  const mockOnSelectAssetType = jest.fn()
  const mockOnChangeDateFrom = jest.fn()
  const mockOnChangeDateTo = jest.fn()
  const mockOnChangeDate = jest.fn()

  it('renders DropdownSelect and Datepickers correctly', () => {
    render(
      <Filters
        assetType={undefined}
        onSelectAssetType={mockOnSelectAssetType}
        dateFrom={new Date('2022-01-01')}
        dateTo={new Date('2022-12-31')}
        date={new Date('2022-06-15')}
        onChangeDateTo={mockOnChangeDateTo}
        onChangeDateFrom={mockOnChangeDateFrom}
        onChangeDate={mockOnChangeDate}
        tab="Overview"
      />,
    )

    expect(screen.getByText('All assets')).toBeInTheDocument()
    expect(screen.getByLabelText('Date:')).toBeInTheDocument()

    expect(screen.getByLabelText('From:')).toBeDisabled()
    expect(screen.getByLabelText('To:')).toBeDisabled()

    fireEvent.click(screen.getByTestId(/dropdown/))
    fireEvent.click(screen.getByText(AssetType.Crypto))

    expect(mockOnSelectAssetType).toHaveBeenCalledWith(AssetType.Crypto)
  })

  it('should enable Datepickers on the History tab', () => {
    render(
      <Filters
        assetType={AssetType.Crypto}
        onSelectAssetType={mockOnSelectAssetType}
        dateFrom={new Date('2022-01-01')}
        dateTo={new Date('2022-12-31')}
        date={new Date('2022-06-15')}
        onChangeDateTo={mockOnChangeDateTo}
        onChangeDateFrom={mockOnChangeDateFrom}
        onChangeDate={mockOnChangeDate}
        tab="History"
      />,
    )

    expect(screen.getByLabelText('From:')).not.toBeDisabled()
    expect(screen.getByLabelText('To:')).not.toBeDisabled()
  })
})
