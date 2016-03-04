import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'material-ui/lib/table/table'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'

import {durationFormat} from 'modules/Stopwatch'

let Laps = ({ laps }) => {
  const font_style = {fontSize: '20px'}
  const lap_rows = laps
    .map((time, index) => (
      <TableRow key={index}>
        <TableRowColumn style={font_style}>Lap {index+1}</TableRowColumn>
        <TableRowColumn style={Object.assign({}, font_style, {textAlign: 'right'})} >
          {durationFormat(time)}
        </TableRowColumn>
      </TableRow>
    ))
    // first lap is at the bottom
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
