import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'material-ui/lib/table/table'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import moment from 'moment'

let Laps = ({ laps }) => {
  const lap_rows = laps
    .map((time, index) => (
      <TableRow key={index} >
        <TableRowColumn>Lap {index+1}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right'}} >{moment(time).format('h:mm:ss.SS')}</TableRowColumn>
      </TableRow>
    ))
    // first lap at the bottom
    .reverse()

  return (
    <Table>
      <TableBody displayRowCheckbox={false}>
        {lap_rows}
      </TableBody>
    </Table>
  )
}

Laps.propTypes = {
  laps: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  laps: state.stopwatch.laps
})

export default connect(
  mapStateToProps
)(Laps)
