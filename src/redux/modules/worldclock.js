// import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const WORLDCLOCK_SET_CITY = 'WORLDCLOCK_SET_CITY'

// ------------------------------------
// Actions
// ------------------------------------
export const set_city = () => ({
  type: WORLDCLOCK_SET_CITY
})

export const actions = {
  set_city
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WORLDCLOCK_SET_CITY]: (state, action) => {
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cities: [
    'Australia/Sydney',
    'Europe/Chisinau',
    'Asia/Hong_Kong',
    'Pacific/Auckland'
  ]
}

export default function worldClockReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
