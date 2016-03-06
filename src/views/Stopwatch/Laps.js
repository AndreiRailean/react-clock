import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'material-ui/lib/table/table'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import Colors from 'material-ui/lib/styles/colors'

import { stopwatchFormat as time_format } from 'utils/timeFormatter'

const font_style = {
  fontSize: '20dp'
}

let Laps = ({ laps }) => {
  const lap_rows = laps
    .map((time, index) => {
      let row_highlight = ''

      if (time === Math.min(...laps) && laps.length > 1) {
        row_highlight = Colors.green50
      } else if (time === Math.max(...laps) && laps.length > 1) {
        row_highlight = Colors.orange50
      }

      return (
        <TableRow key={index} style={{backgroundColor: row_highlight}}>
          <TableRowColumn style={font_style}>Lap {index+1}</TableRowColumn>
          <TableRowColumn style={Object.assign({}, font_style, {textAlign: 'right'})} >
            <span>{time_format(time)}</span>
          </TableRowColumn>
        </TableRow>
      )
    })
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
