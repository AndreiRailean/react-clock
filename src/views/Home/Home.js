import React from 'react'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'

import TopBar from 'components/topbar'

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
