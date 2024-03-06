import { useQuery } from '@tanstack/react-query'
import { getPrices, GetPricesOptions } from '../../../api/rest.ts'

export const usePrices = (options?: GetPricesOptions) => {
  return useQuery({
    queryKey: ['prices', options],
    queryFn: () => getPrices(options),
    enabled: options?.assets !== undefined,
  })
}
