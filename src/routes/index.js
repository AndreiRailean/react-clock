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

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='stopwatch' />
    <Route path='stopwatch' component={Stopwatch} />
    <Route path='timer' component={Timer} />
  </Route>
)
