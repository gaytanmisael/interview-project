import { Tax } from "@interfaces/tax";

export const Taxes: Tax[] = [
  {
    name: 'No Tax',
    original: true,
    rate: 0
  },
  {
    name: 'Standard Tax',
    original: true,
    rate: .0875
  }
]
