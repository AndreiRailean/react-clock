import React from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import NavigationMoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

const TopBar = ({title='Clock App'}) => (
  <AppBar
    title={title}
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
          primaryText='Home'
          containerElement={<Link to='/' />}
        />
        <Divider />
        <MenuItem
          primaryText='World Clock'
          containerElement={<Link to='/worldclock' />}
        />
        <MenuItem
          primaryText='Alarm'
          containerElement={<Link to='/alarm' />}
        />
        <MenuItem
          primaryText='Stopwatch'
          containerElement={<Link to='/stopwatch' />}
        />
        <MenuItem
          primaryText='Timer'
          containerElement={<Link to='/timer' />}
        />
        <Divider />
        <MenuItem
          primaryText='Info'
          containerElement={<Link to='/info' />}
        />

      </IconMenu>
    }
  />
)

TopBar.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default TopBar
