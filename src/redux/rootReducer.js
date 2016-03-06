import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import stopwatch from './modules/stopwatch'
import timer from './modules/timer'

export default combineReducers({
  stopwatch,
  timer,
  router
})
