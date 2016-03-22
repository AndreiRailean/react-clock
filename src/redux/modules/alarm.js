import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const ALARM_ADD = 'ALARM_ADD'
export const ALARM_DELETE = 'ALARM_DELETE'
export const ALARM_EDIT = 'ALARM_EDIT'
export const ALARM_TOGGLE = 'ALARM_TOGGLE'

// ------------------------------------
// Actions
// ------------------------------------
export const add_alarm = () => ({
  type: ALARM_ADD
})

export const delete_alarm = (index) => ({
  type: ALARM_DELETE,
  index
})

export const edit_alarm = (index, data) => ({
  type: ALARM_EDIT,
  index,
  data
})

export const toggle_alarm = (index) => ({
  type: ALARM_TOGGLE,
  index
})

export const actions = {
  add_alarm,
  delete_alarm,
  edit_alarm,
  toggle_alarm
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ALARM_ADD]: (state, action) => {
    return state
  },

  [ALARM_DELETE]: (state, action) => {
    return update(state, {
      list: {$splice: [[action.index, 1]]}
    })
  },

  [ALARM_EDIT]: (state, action) => {
    return update(state, {
      list: {$splice: [[action.index, 1, action.data]]}
    })
  },

  [ALARM_TOGGLE]: (state, action) => {
    const alarm = state.list[action.index]
    alarm.enabled = !alarm.enabled

    return update(state, {
      list: {$splice: [[action.index, 1, alarm]]}
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: [{
    time: '7:42 AM',
    label: 'Alarm',
    repeat: null,
    snooze: true,
    sound: null,
    enabled: true
  }, {
    time: '10:20 AM',
    label: 'Waky-Waky',
    repeat: [1, 2, 7],
    snooze: false,
    sound: null,
    enabled: false
  }, {
    time: '1:37 PM',
    label: 'Vacuum Now',
    repeat: null,
    snooze: true,
    sound: null,
    enabled: true
  }]
}

export default function alarmReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
