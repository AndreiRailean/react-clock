import React, { PropTypes } from 'react'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import * as Colors from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Toggle from 'material-ui/Toggle'

import { app_background as default_background } from 'config'

const ListItem = ({time, label='', enabled=true, editing=false, onToggle, onDelete, onEdit}) => {
  let toggleControl = ''
  let deleteControl = ''
  let editControl = null

  let style = {
    main: {
      backgroundColor: Colors.white
    },

    time: {
      margin: '0 0 5px',
      fontWeight: 'normal',
      fontSize: '30px'
    },

    timeContainer: {
      color: Colors.black
    }
  }

  if (!enabled) {
    style.main.backgroundColor = default_background
    style.timeContainer.color = Colors.grey500
  }

  if (editing) {
    editControl = (
      <IconButton
        touch
        onTouchTap={onEdit}
        style={{position: 'absolute', top: '20px', right: '15px'}}
      >
        <ChevronRight color={Colors.grey500} />
      </IconButton>
    )

    deleteControl = (
      <IconButton
        touch
        onTouchTap={onDelete}
        style={{position: 'absolute', top: '20px', left: '15px'}}
      >
        <RemoveIcon color={Colors.red400} />
      </IconButton>
    )

    style.timeContainer.marginLeft = '60px'
  } else {
    toggleControl = (
      <div style={{position: 'absolute', top: '30px', right: '15px'}}>
        <Toggle toggled={enabled} onToggle={onToggle} />
      </div>
    )
  }

  let right_control = toggleControl
  if (editing) {
    right_control = editControl
  }

  return (
    <Card style={style.main}>
      <CardText style={{position: 'relative'}}>
        {deleteControl}
        <div style={style.timeContainer}>
          <h2 style={style.time}>{time}</h2>
          {label}
        </div>
        {right_control}
      </CardText>
    </Card>
  )
}

ListItem.propTypes = {
  time: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ListItem
