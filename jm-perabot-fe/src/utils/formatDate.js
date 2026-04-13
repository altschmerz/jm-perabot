const formatDate = (isoDateString) => {
  if (!isoDateString) return

  const isoDate = new Date(isoDateString)
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  let formattedDate = formatter.format(isoDate)
  formattedDate = formattedDate
    .replace(/\//g, '-')
    .replace(/\./g, ':')
    .replace(/,/, '')

  return formattedDate
}

export default formatDate
