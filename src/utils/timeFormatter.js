import moment from 'moment'
import 'moment-duration-format'

export const stopwatchFormat = (ms) => {
  const time = moment.duration(ms, 'milliseconds')

  let format = 'mm:ss.SSS'
  if (time.hours()) {
    format = 'h:mm:ss.SSS'
  }

  const output = time.format(format, { forceLength: true, trim: false })
  return output.substring(0, output.length-1) // show only 2 most significant digits in millisecond format
}

export const timerFormat = (ms) => {
  const time = moment.duration(ms, 'milliseconds')

  let format = 'mm:ss'
  if (time.hours()) {
    format = 'h:mm:ss'
  }

  return time.format(format, { forceLength: true, trim: false })
}

export const durationToTimeHash = (ms) => {
  const time = moment.duration(ms, 'milliseconds')
  return {
    days: time.days(),
    hours: time.hours(),
    minutes: time.minutes(),
    seconds: time.seconds(),
    milliseconds: time.milliseconds()
  }
}
