import polka from 'polka'
import cors from 'cors'

const assetTickers = ['APPL', 'GOOG', 'GBP', 'BTC', 'ETH', 'MSFT', 'TSLA']

const assetsFixture = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'APPL',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'GOOG',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174005',
    name: 'GBP',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    name: 'BTC',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174007',
    name: 'ETH',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    name: 'MSFT',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    name: 'TSLA',
  },
]

function generatePrices(startDate, endDate) {
  const basePrices = {
    APPL: 150,
    GOOG: 2800,
    GBP: 1.3,
    BTC: 50000,
    ETH: 4000,
    MSFT: 300,
    TSLA: 700,
  }

  let prices = []
  let currentDate = new Date(startDate.getTime())

  while (currentDate <= endDate) {
    assetTickers.forEach((asset) => {
      const fluctuation = Math.random() * 0.1 - 0.05 // +/- 5%
      const price = basePrices[asset] * (1 + fluctuation)
      prices.push({
        date: currentDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        asset: asset,
        price: parseFloat(price.toFixed(2)), // Round to 2 decimal places
      })
    })
    currentDate.setDate(currentDate.getDate() + 1) // Move to next day
  }

  return prices
}

function generatePortfolio(selectedAssets) {
  const assets =
    selectedAssets ||
    assetTickers
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * assetTickers.length) + 1)

  // Assume each asset has a random quantity for the sake of example
  return assets.map((asset) => ({
    asset: asset,
    quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
  }))
}

function selectPrices(prices, { assets, asOf, from, to }) {
  let fromDate, toDate

  // Adjust fromDate and toDate based on provided parameters
  if (asOf) {
    fromDate = new Date(asOf)
    toDate = new Date(asOf)
  } else if (from && to) {
    // If both from and to are set
    fromDate = new Date(from)
    toDate = new Date(to)
  } else if (from) {
    // If only from is set, range is from -> today
    fromDate = new Date(from)
    toDate = new Date()
  } else if (to) {
    // If only to is set, range is one year before to -> to
    toDate = new Date(to)
    fromDate = new Date(toDate.getFullYear() - 1, toDate.getMonth(), toDate.getDate())
  } else {
    // If none are set, default to today's prices
    fromDate = new Date()
    toDate = new Date()
  }

  // Normalize the start and end of the date range
  fromDate.setHours(0, 0, 0, 0) // Start of the day for fromDate
  toDate.setHours(23, 59, 59, 999) // End of the day for toDate

  // Filter and sort prices within the specified date range and for specified assets
  const relevantPrices = prices
    .filter((price) => {
      const priceDate = new Date(price.date)
      return (
        (!assets || assets.includes(price.asset)) &&
        priceDate >= fromDate &&
        priceDate <= toDate
      )
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  // Deduplicate prices by keeping the last price for each asset on each day
  const organizedPrices = {}
  relevantPrices.forEach((price) => {
    const dateKey = price.date.split('T')[0] // YYYY-MM-DD
    const assetKey = price.asset
    organizedPrices[dateKey] = organizedPrices[dateKey] || {}
    organizedPrices[dateKey][assetKey] = price
  })

  // Flatten the organized prices
  return Object.values(organizedPrices).flatMap((datePrices) => Object.values(datePrices))
}

function selectPortfolio(
  portfolio,
  prices,
  { asOf = new Date().toISOString().split('T')[0] },
) {
  // Correctly structured call to selectPrices with the required parameters
  const selectedPrices = selectPrices(prices, {
    asOf,
  })

  // Enrich the generated portfolio with price information
  const portfolioWithPrices = portfolio.map((asset) => {
    const priceInfo = selectedPrices.find((price) => price.asset === asset.asset)
    return {
      ...asset,
      price: priceInfo ? priceInfo.price : null,
      value: priceInfo ? priceInfo.price * asset.quantity : null,
    }
  })

  return {
    asOf,
    positions: portfolioWithPrices,
  }
}

const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(startDate.getFullYear() - 1) // One year ago

const prices = generatePrices(startDate, endDate)
const portfolio = generatePortfolio()

polka()
  .use(cors({ origin: true }))
  .get('/assets', (req, res) => {
    res.end(JSON.stringify(assetsFixture))
  })
  .get('/prices', (req, res) => {
    const data = selectPrices(prices, {
      assets: req.query.assets,
      asOf: req.query.asOf,
      from: req.query.from,
      to: req.query.to,
    })
    res.end(JSON.stringify(data))
  })
  .get('/portfolios', (req, res) => {
    const data = selectPortfolio(portfolio, prices, { asOf: req.query.asOf })
    res.end(JSON.stringify(data))
  })
  .listen(3000, () => {
    console.log(`> Running Server on localhost:3000`)
  })
