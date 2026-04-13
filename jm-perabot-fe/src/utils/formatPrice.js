const formatPrice = (price) => {
  if (!formatPrice) return 0

  const formatter = new Intl.NumberFormat('id-ID')
  return formatter.format(price)
}

export default formatPrice
