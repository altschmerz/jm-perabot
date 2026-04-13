const formatDate = (isoDateString) => {
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
  console.log('FORMATTED', formattedDate)
  formattedDate = formattedDate
    .replace(/\//g, '-')
    .replace(/\./g, ':')
    .replace(/,/, '')
  console.log('CLEANED', formattedDate)

  return formattedDate
}

export default formatDate
