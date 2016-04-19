import React from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationMoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

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
