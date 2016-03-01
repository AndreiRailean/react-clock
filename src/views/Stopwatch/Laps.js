import React, { PropTypes } from 'react'
import Table from 'material-ui/lib/table/table'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import moment from 'moment'

let Laps = ({ laps }) => (
  <Table>
    <TableBody displayRowCheckbox={false}>
    {laps.map((one_lap_time, index) => (
      <TableRow key={index} >
        <TableRowColumn>Lap {index+1}</TableRowColumn>
        <TableRowColumn>{moment(one_lap_time).format('mm:ss.SS')}</TableRowColumn>
      </TableRow>
    ))}
    </TableBody>
  </Table>
)

Laps.propTypes = {
  laps: PropTypes.array.isRequired
}

export default Laps
