function shuffle(arr: Array<any>) {
  const a = arr.map(i => i).slice(1)

  for (let i = a.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }

  a.unshift(arr[0])

  return a
}

export default shuffle
