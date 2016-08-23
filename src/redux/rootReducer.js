import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import stopwatch from './modules/stopwatch'
import timer from './modules/timer'
import worldclock from './modules/worldclock'
import alarm from './modules/alarm'

export default combineReducers({
  stopwatch,
  timer,
  worldclock,
  alarm,
  router
})
