// Opening-hours helpers. All times are treated as UK local time (Europe/London).

const toMin = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** Current day (0-6) and minutes past midnight in Europe/London. */
export function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, mins: Number(get('hour')) * 60 + Number(get('minute')) }
}

/** "12:00" -> "12pm", "23:30" -> "11:30pm", "00:30" -> "12:30am" */
export function fmt(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`
}

/** Is the bar open right now? Handles closing times after midnight. */
export function openStatus(hours, date = new Date()) {
  const { day, mins } = londonNow(date)
  const byDay = Object.fromEntries(hours.map((h) => [h.day, h]))

  // Still open from yesterday's late licence?
  const yesterday = byDay[(day + 6) % 7]
  if (yesterday) {
    const [o, c] = yesterday.bar.map(toMin)
    if (c < o && mins < c) return { open: true, text: `Open now until ${fmt(yesterday.bar[1])}` }
  }

  const today = byDay[day]
  if (today) {
    const [o, c] = today.bar.map(toMin)
    const close = c < o ? c + 1440 : c
    if (mins >= o && mins < close) return { open: true, text: `Open now until ${fmt(today.bar[1])}` }
    if (mins < o) return { open: false, text: `Opens today at ${fmt(today.bar[0])}` }
  }
  const tomorrow = byDay[(day + 1) % 7]
  return { open: false, text: tomorrow ? `Closed now. Opens tomorrow at ${fmt(tomorrow.bar[0])}` : 'Closed now' }
}
