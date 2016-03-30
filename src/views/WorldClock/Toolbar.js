import React from 'react'

import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

const WorldClockToolbar = ({onEditToggle, editing}) => {
  const left_button_label = editing
    ? 'Edit'
    : 'Done'

  return (
    <Toolbar>
      <ToolbarGroup firstChild float='left'>
        <FlatButton label={left_button_label} primary onTouchTap={onEditToggle} />
      </ToolbarGroup>
      <ToolbarGroup lastChild float='right'>
        <FlatButton label='+' primary />
      </ToolbarGroup>
    </Toolbar>
  )
}

WorldClockToolbar.propTypes = {
  editing: React.PropTypes.bool.isRequired,

  onEditToggle: React.PropTypes.func
}

export default WorldClockToolbar
