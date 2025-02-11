import { useState, useEffect } from "react"

const useCurrencyFormat = (amount = 0, currency = "USD") => {
  const [format, setFormat] = useState(() => () => "")

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0
    })

    setFormat(() => formatter.format)
  }, [currency, amount])
  return format
}

export default useCurrencyFormat
