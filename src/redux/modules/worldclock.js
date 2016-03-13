import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const WORLDCLOCK_ADD_CITY = 'WORLDCLOCK_ADD_CITY'
export const WORLDCLOCK_DELETE_CITY = 'WORLDCLOCK_DELETE_CITY'

// ------------------------------------
// Actions
// ------------------------------------
export const add_city = (city) => ({
  type: WORLDCLOCK_ADD_CITY,
  city: city
})

export const delete_city = (city) => ({
  type: WORLDCLOCK_DELETE_CITY,
  city: city
})

export const actions = {
  add_city,
  delete_city
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WORLDCLOCK_ADD_CITY]: (state, action) => {
    const city = action.city

    if (state.cities.includes(city)) return state

    return update(state, {
      cities: {$push: [city]}
    })
  },

  [WORLDCLOCK_DELETE_CITY]: (state, action) => {
    const city = action.city
    let index = state.cities.indexOf(city)
    if (index === -1) return state

    return update(state, {
      cities: {$splice: [[index, 1]]}
    })
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cities: [
    'Australia/Sydney',
    'Europe/Chisinau'
  ]
}

export default function worldClockReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
