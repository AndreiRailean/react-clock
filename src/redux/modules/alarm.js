import update from 'react-addons-update'
import uuid from 'uuid'

// ------------------------------------
// Constants
// ------------------------------------
export const ALARM_DELETE = 'ALARM_DELETE'
export const ALARM_SAVE = 'ALARM_SAVE'
export const ALARM_TOGGLE = 'ALARM_TOGGLE'

// ------------------------------------
// Actions
// ------------------------------------
export const delete_alarm = (id) => ({
  type: ALARM_DELETE,
  payload: {
    id
  }
})

export const save_alarm = (alarm) => ({
  type: ALARM_SAVE,
  payload: {
    alarm
  }
})

export const toggle_alarm = (id) => ({
  type: ALARM_TOGGLE,
  payload: {
    id
  }
})

export const actions = {
  delete_alarm,
  save_alarm,
  toggle_alarm
}

export const emptyAlarm = {
  time: '7:42 AM',
  label: 'Alarm',
  repeat: [],
  snooze: true,
  sound: null,
  enabled: true
}

export const findAlarmIndex = (state, alarm) => {
  return state.findIndex((a) => (a.id === alarm.id))
}

export const getAlarmById = (state, id) => {
  return state.find((a) => (a.id === id))
}

export const getNewAlarm = () => (emptyAlarm)
export const isNewAlarm = (alarm) => isNaN(alarm.id)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ALARM_DELETE]: (state, action) => {
    let { id } = action.payload
    const index = findAlarmIndex(state, {id})
    return update(state, {
      $splice: [[index, 1]]
    })
  },

  [ALARM_SAVE]: (state, action) => {
    const { alarm } = action.payload
    let $update = {}
    let index = findAlarmIndex(state, alarm)
    if (index < 0) {
      alarm.id = uuid.v4()
      $update = {$push: [alarm]}
    } else {
      $update = {$splice: [[index, 1, alarm]]}
    }

    return update(state, $update)
  },

  [ALARM_TOGGLE]: (state, action) => {
    const {id} = action.payload
    const index = findAlarmIndex(state, {id})
    const alarm = state[index]
    alarm.enabled = !alarm.enabled

    return update(state, {
      $splice: [[index, 1, alarm]]
    })
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [
  {
    id: 0,
    time: '7:42 AM',
    label: 'Alarm',
    repeat: [],
    snooze: true,
    sound: null,
    enabled: true
  },
  {
    id: 1,
    time: '10:20 AM',
    label: 'Waky-Waky',
    repeat: [0, 2, 6],
    snooze: false,
    sound: null,
    enabled: false
  },
  {
    id: 2,
    time: '1:37 PM',
    label: 'Vacuum Now',
    repeat: [],
    snooze: true,
    sound: null,
    enabled: true
  }
]

export default function alarmReducer (state=initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
