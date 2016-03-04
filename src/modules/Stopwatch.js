import moment from 'moment'
import 'moment-duration-format'

export const durationFormat = (duration_ms) => {
  const m = moment.duration(duration_ms)

  let format = 'mm:ss.SSS'
  if (m.days()) {
    format = 'h:mm:ss.SSS'
  }
  let result = moment.duration(duration_ms, 'milliseconds').format(format, { forceLength: true, trim: false })
  return result.substring(0, result.length-1) // show only 2 most significant digits in millisecond format
}
