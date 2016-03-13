import React from 'react'

import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

const WorldClockToolbar = () => (
  <Toolbar>
    <ToolbarGroup firstChild float='left'>
      <FlatButton label='Edit' primary />
    </ToolbarGroup>
    <ToolbarGroup lastChild float='right'>
      <FlatButton label='+' primary />
    </ToolbarGroup>
  </Toolbar>
)

export default WorldClockToolbar
