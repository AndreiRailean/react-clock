import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Stopwatch from '../views/Stopwatch/Stopwatch'
import Timer from '../views/Timer/Timer'
import Info from '../views/Info/Info'
import Home from '../views/Home/Home'
import WorldClock from '../views/WorldClock/WorldClock'
import AlarmApp from '../views/Alarm/AlarmApp'
import AlarmEdit from '../views/Alarm/AlarmEdit'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='home' />
    <Route path='home' component={Home} />
    <Route path='worldclock' component={WorldClock} />
    <Route path='alarm' component={AlarmApp} />
    <Route path='alarms/:id/edit' component={AlarmEdit} />
    <Route path='alarms/add' component={AlarmEdit} />
    <Route path='stopwatch' component={Stopwatch} />
    <Route path='timer' component={Timer} />
    <Route path='info' component={Info} />
  </Route>
)
