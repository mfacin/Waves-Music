const localStorage = {
  get: <T>(key: string, defaultValue: T) => {
    const value = window.localStorage.getItem(key)

    if (!value) return defaultValue

    return JSON.parse(value)
  },
  set: <T>(key: string, value: T) => {
    const parsedValue = JSON.stringify(value)

    window.localStorage.setItem(key, parsedValue)
  },
}

export default localStorage
