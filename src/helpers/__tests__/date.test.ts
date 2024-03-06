import { formatDateToYYYYMMDD } from '../date.ts'

describe('formatDateToYYYYMMDD', () => {
  it('should format dates with single-digit months and days correctly', () => {
    // January 5, 2023
    const date = new Date(2023, 0, 5) // Note: Months are 0-indexed in JavaScript Date
    const formattedDate = formatDateToYYYYMMDD(date)
    expect(formattedDate).toBe('2023-01-05')
  })

  it('should format dates with double-digit months and days correctly', () => {
    // October 25, 2023
    const date = new Date(2023, 9, 25) // Note: Months are 0-indexed in JavaScript Date
    const formattedDate = formatDateToYYYYMMDD(date)
    expect(formattedDate).toBe('2023-10-25')
  })

  it('should handle leap year dates correctly', () => {
    // February 29, 2024
    const date = new Date(2024, 1, 29) // Note: Months are 0-indexed in JavaScript Date
    const formattedDate = formatDateToYYYYMMDD(date)
    expect(formattedDate).toBe('2024-02-29')
  })
})
