import { useQuery } from '@tanstack/react-query'
import { getPortfolio, GetPortfolioOptions } from '../../../api/rest.ts'

export const usePortfolio = (options?: GetPortfolioOptions) => {
  return useQuery({
    queryKey: ['portfolio', options],
    queryFn: () => getPortfolio(options),
  })
}
