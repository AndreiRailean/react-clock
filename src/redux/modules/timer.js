import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const TIMER_START = 'TIMER_START'
export const TIMER_CANCEL = 'TIMER_CANCEL'
export const TIMER_PAUSE = 'TIMER_PAUSE'
export const TIMER_UPDATE_TIME = 'TIMER_UPDATE_TIME'

// ------------------------------------
// Actions
// ------------------------------------
export const start = () => ({
  type: TIMER_START
})

export const cancel = () => ({
  type: TIMER_CANCEL
})

export const pause = () => ({
  type: TIMER_PAUSE
})

export const updateTime = () => ({
  type: TIMER_UPDATE_TIME
})

export const actions = {
  start,
  cancel,
  pause,
  update
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TIMER_START]: (state, action) => {
    const timestamp = new Date().getTime()
    return update(state, {
      running: {$set: true},
      last_update: {$set: timestamp}
    })
  },

  [TIMER_PAUSE]: (state, action) => {
    const timestamp = new Date().getTime()
    const last_update = state.last_update
    const time_delta = timestamp - last_update

    return update(state, {
      elapsed: { $apply: (x) => x+time_delta },
      last_update: {$set: null},
      running: {$set: false}
    })
  },

  [TIMER_CANCEL]: (state, action) => {
    return update(state, {
      elapsed: {$set: 0},
      last_update: {$set: null},
      running: {$set: false},
      done: {$set: false}
    })
  },

  [TIMER_UPDATE_TIME]: (state, action) => {
    const timestamp = new Date().getTime()
    const last_update = state.last_update || timestamp
    const time_delta = timestamp - last_update

    if (!state.running || state.done) {
      return state
    }

    let elapsed = state.elapsed + time_delta
    if (elapsed > state.setting) {
      elapsed = state.setting
    }

    return update(state, {
      elapsed: { $set: elapsed },
      last_update: { $set: timestamp },
      done: { $set: (elapsed >= state.setting) }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  setting: 6000000, // one minute
  elapsed: 0,
  last_update: null,
  running: false,
  done: false
}

export default function timerReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
