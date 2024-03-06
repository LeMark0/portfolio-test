import { useCallback, useState } from 'react'
import { MainLayout } from '../../layouts/MainLayout.tsx'
import { Tabs } from '../../components/Tabs'
import { Card } from '../../components/Card.tsx'
import { Overview } from './Overview'
import { History } from './History'
import { AssetType } from '../../constants/tickers.ts'
import { Filters } from './Filters'

enum Tab {
  'Overview' = 'Overview',
  'History' = 'History',
}

const getDefaultDateFrom = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)

  return date
}

export const Portfolio = () => {
  const [tab, setTab] = useState<Tab>(Tab.Overview)
  const [assetType, setAssetType] = useState<AssetType | undefined>()

  const today = new Date()

  const [dateFrom, setDateFrom] = useState<Date | undefined>(getDefaultDateFrom())
  const [dateTo, setDateTo] = useState<Date | undefined>(today)
  const [date, setDate] = useState<Date | undefined>(today)

  const handleSelectAssetType = useCallback((value: string | null) => {
    setAssetType(value as AssetType)
  }, [])

  const handleChangeTab = useCallback((value: string) => {
    setTab(value as Tab)
  }, [])

  return (
    <MainLayout>
      <Card>
        <div className="md:flex md:w-full">
          <div className="md:grow p-8 md:w-full">
            <div className="w-full">
              <Tabs
                onChange={handleChangeTab}
                options={[Tab.Overview, Tab.History]}
                value={tab}
              />
              {tab === 'Overview' && <Overview assetType={assetType} date={date} />}
              {tab === 'History' && (
                <History assetType={assetType} dateFrom={dateFrom} dateTo={dateTo} />
              )}
            </div>
          </div>
          <div className="p-8 bg-slate-500 rounded-b-lg md:rounded-none md:rounded-r-lg md:min-w-96">
            <Filters
              assetType={assetType}
              onSelectAssetType={handleSelectAssetType}
              dateFrom={dateFrom}
              dateTo={dateTo}
              date={date}
              onChangeDateFrom={setDateFrom}
              onChangeDateTo={setDateTo}
              onChangeDate={setDate}
              tab={tab}
            />
          </div>
        </div>
      </Card>
    </MainLayout>
  )
}
