/**
 * 
 * @param {Number} unixTimestamp //Unix timestamp format
 * @returns LocaleDate to user friendly read
 */
export const convertUnixToDate = (unixTimestamp) => {
  if(!unixTimestamp)
    return ''
  const localeOpts = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: "UTC"
  }
  const date = new Date(unixTimestamp * 1000).toLocaleString('en-US', localeOpts)
  return date
}
