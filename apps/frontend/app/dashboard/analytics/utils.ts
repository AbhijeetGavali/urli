export function formatChartData(daily: { date: string; count: number }[]) {
  // Fill missing days with 0
  const map = Object.fromEntries(daily.map(d => [d.date, d.count]))
  const result = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    result.push({ date: key.slice(5), count: map[key] || 0 })
  }
  return result
}

export function topN(arr: { count: number }[], n = 5) {
  return [...arr].sort((a, b) => b.count - a.count).slice(0, n)
}
