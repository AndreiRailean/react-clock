import React from 'react'
import { Link } from 'react-router'

import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardTitle from 'material-ui/Card/CardTitle'
import FlatButton from 'material-ui/FlatButton'
import CardText from 'material-ui/Card/CardText'

import TopBar from '../../components/TopBar'

const Info = () => (
  <div>
    <TopBar title='Clock App' />

    <Card>
      <CardTitle title='Stopwatch' />
      <CardText>
        00:00.00
      </CardText>
      <CardActions>
        <FlatButton label='Start Stopwatch' />
        <FlatButton
          label='Go To Stopwatch'
          containerElement={<Link to='/stopwatch' />}
          linkButton
        />
      </CardActions>
    </Card>

    <Card>
      <CardTitle title='Timer' />
      <CardText>
        59:13
      </CardText>
      <CardActions>
        <FlatButton label='Pause Timer' />
        <FlatButton
          label='Go To Timer'
          containerElement={<Link to='/timer' />}
          linkButton
        />
      </CardActions>
    </Card>

  </div>
)

export default Info
