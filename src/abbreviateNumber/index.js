// @flow

type prefixes = { value: number, symbol: string }

const SI_PREFIXES = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" }
]

export default (data: mixed): string => {
  const number: number = Math.round(Number(data))

  if (number === 0 || Number.isNaN(number)) return String(0)

  const { value, symbol }: prefixes = SI_PREFIXES.filter(
    (n: prefixes) => number >= n.value
  ).pop()

  const numberFixed: number = parseFloat((number / value).toFixed(1))

  return `${numberFixed}${symbol}`
}
