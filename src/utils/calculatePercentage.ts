const calculatePercentage = (currentTime: number, duration: number) => {
  const roundedCurrent = Math.floor(Number(currentTime))
  const roundedDuration = Math.floor(duration)
  const newPercentage = Math.floor((roundedCurrent / roundedDuration) * 100)

  return newPercentage
}

export default calculatePercentage
