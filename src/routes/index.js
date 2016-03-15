import React from 'react'
import { Route, IndexRedirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Stopwatch from 'views/Stopwatch/Stopwatch'
import Timer from 'views/Timer/Timer'
import Info from 'views/Info/Info'
import Home from 'views/Home/Home'
import WorldClock from 'views/WorldClock/WorldClock'
import AlarmApp from 'views/Alarm/AlarmApp'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='home' />
    <Route path='home' component={Home} />
    <Route path='worldclock' component={WorldClock} />
    <Route path='alarm' component={AlarmApp} />
    <Route path='stopwatch' component={Stopwatch} />
    <Route path='timer' component={Timer} />
    <Route path='info' component={Info} />
  </Route>
)
