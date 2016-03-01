import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const STOPWATCH_START = 'STOPWATCH_START'
export const STOPWATCH_STOP = 'STOPWATCH_STOP'
export const STOPWATCH_LAP = 'STOPWATCH_LAP'
export const STOPWATCH_RESET = 'STOPWATCH_RESET'
export const STOPWATCH_UPDATE_TIME = 'STOPWATCH_UPDATE_TIME'

// ------------------------------------
// Actions
// ------------------------------------
export const start = () => {
  return (dispatch, getState) => {
    dispatch({type: STOPWATCH_START})
  }
}

export const stop = () => {
  return (dispatch, getState) => {
    dispatch({type: STOPWATCH_STOP})
  }
}

export const lap = () => ({
  type: STOPWATCH_LAP
})

export const reset = () => ({
  type: STOPWATCH_RESET
})

export const updateTime = () => ({
  type: STOPWATCH_UPDATE_TIME
})

export const actions = {
  start,
  stop,
  lap,
  reset,
  updateTime
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STOPWATCH_START]: (state, action) => {
    const timestamp = new Date().getTime()
    return update(state, {
      running: {$set: true},
      last_update: {$set: timestamp}
    })
  },

  [STOPWATCH_STOP]: (state, action) => {
    const timestamp = new Date().getTime()
    const last_update = state.last_update
    const time_delta = timestamp - last_update

    return update(state, {
      duration: { $apply: (x) => x+time_delta },
      lap_duration: { $apply: (x) => x+time_delta },
      last_update: {$set: null},
      running: {$set: false}
    })
  },

  [STOPWATCH_LAP]: (state, action) => {
    return update(state, {
      laps: {$push: [state.lap_duration]},
      lap_duration: {$set: 0}
    })
  },

  [STOPWATCH_RESET]: (state, action) => {
    return initialState
  },

  [STOPWATCH_UPDATE_TIME]: (state, action) => {
    const timestamp = new Date().getTime()
    const last_update = state.last_update || timestamp
    const time_delta = timestamp - last_update

    return update(state, {
      duration: { $apply: (x) => x+time_delta },
      lap_duration: { $apply: (x) => x+time_delta },
      last_update: { $apply: (x) => (state.running?timestamp:null) }
    })
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  duration: 0,
  lap_duration: 0,
  last_update: null,
  laps: [],
  running: false
}

export default function stopwatchReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
