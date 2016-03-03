import React from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import NavigationMoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'

const TopBar = () => (
  <AppBar
    title='Stopwatch'
    showMenuIconButton={null}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton touch>
            <NavigationMoreVertIcon />
          </IconButton>
        }
      >
        <MenuItem
          primaryText='Stopwatch'
          containerElement={<Link to='/stopwatch' />}
        />
        <MenuItem
          primaryText='Timer'
          containerElement={<Link to='/timer' />}
        />
      </IconMenu>
    }
  />
)

export default TopBar
