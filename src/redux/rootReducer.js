import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import stopwatch from './modules/stopwatch'

export default combineReducers({
  stopwatch,
  router
})
