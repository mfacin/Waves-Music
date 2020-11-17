// take a number of seconds and format into hh:mm:ss format
const timeFormater = (time: number): string => {
  const hours = Math.floor(time / 60 / 60)
  const minutes = `0${Math.floor(time / 60)}`.slice(-2)
  const seconds = `0${Math.floor(time % 60)}`.slice(-2)

  // if hours is not equals to 0, format it
  const hoursString = hours ? `${hours}:` : ''

  // return hh:mm:ss or mm:ss string
  return `${hoursString}${minutes}:${seconds}`
}

export default timeFormater
