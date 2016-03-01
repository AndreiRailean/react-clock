import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

const Navbar = () => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <FlatButton
        containerElement={<Link to='/stopwatch' />}
        linkButton
        label='Stopwatch'
      />
      <FlatButton
        containerElement={<Link to='/timer' />}
        linkButton
        label='Timer'
      />
    </ToolbarGroup>
  </Toolbar>

)

export default Navbar
