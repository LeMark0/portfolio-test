import { DropdownSelect } from '../../../components/DropdownSelect'
import { assetGroups, AssetType } from '../../../constants/tickers.ts'
import { Datepicker } from 'flowbite-react'

const assetGroupOptions = Object.keys(assetGroups).map((groupName) => ({
  label: groupName,
  value: groupName,
}))

type Props = {
  tab: 'Overview' | 'History'
  assetType: AssetType | undefined
  date: Date | undefined
  dateFrom: Date | undefined
  dateTo: Date | undefined
  onSelectAssetType: (value: string | null) => void
  onChangeDateFrom: (value: Date | undefined) => void
  onChangeDateTo: (value: Date | undefined) => void
  onChangeDate: (value: Date | undefined) => void
}

export const Filters = ({
  assetType,
  onSelectAssetType,
  dateFrom,
  dateTo,
  date,
  onChangeDateTo,
  onChangeDateFrom,
  onChangeDate,
  tab,
}: Props) => {
  const today = new Date()

  return (
    <div className="space-y-8">
      <DropdownSelect
        label="All assets"
        value={assetType}
        options={assetGroupOptions}
        onChange={onSelectAssetType}
      />
      <div className="flex justify-between items-center">
        <label htmlFor="date" className="mr-4">
          Date:{' '}
        </label>
        <Datepicker
          disabled={tab !== 'Overview'}
          id="date"
          defaultDate={date}
          maxDate={today}
          onSelectedDateChanged={onChangeDate}
        />
      </div>
      <div className="space-y-4 group ">
        <div className="flex justify-between items-center">
          <label htmlFor="dateFrom" className="mr-4">
            From:{' '}
          </label>
          <Datepicker
            disabled={tab !== 'History'}
            id="dateFrom"
            onSelectedDateChanged={onChangeDateFrom}
            defaultDate={dateFrom}
            maxDate={dateTo ?? today}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="dateTo" className="mr-4">
            To:{' '}
          </label>
          <Datepicker
            disabled={tab !== 'History'}
            id="dateTo"
            onSelectedDateChanged={onChangeDateTo}
            defaultDate={dateTo}
            maxDate={today}
            minDate={dateFrom ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}
