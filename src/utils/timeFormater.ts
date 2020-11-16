const timeFormater = (time: number) => {
  const hours = Math.floor(time / 60 / 60)
  const minutes = `0${Math.floor(time / 60)}`.slice(-2)
  const seconds = `0${Math.floor(time % 60)}`.slice(-2)

  return `${minutes}:${seconds}`
}

export default timeFormater
