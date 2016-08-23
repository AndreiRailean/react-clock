import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import IconButton from 'material-ui/IconButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'
import * as Colors from 'material-ui/styles/colors'
import AutoComplete from 'material-ui/AutoComplete'
import Subheader from 'material-ui/Subheader'
import moment from 'moment-timezone'

import { add_city } from '../../redux/modules/worldclock'

const AddCityList = ({onAdd}) => {
  const moment_cities = moment.tz.names()
    .map((city) => {
      let name, region
      [ region, name ] = city.replace('_', ' ').split('/')
      return {
        region,
        name,
        city_full: city
      }
    })

  const cityList = moment_cities.map((city_obj, i) => {
    let { region, name, city_full } = city_obj

    return (
      <ListItem
        primaryText={name}
        secondaryText={region}
        key={i}
        rightIconButton={
          <IconButton
            touch
            onTouchTap={onAdd(city_full)}
          >
            <ContentAddIcon color={Colors.grey400} />
          </IconButton>
        }
      />
    )
  })

  const cities = moment_cities.map((city) => city.name)
  const autocomplete = (
    <AutoComplete
      floatingLabelText='Type city name'
      filter={AutoComplete.fuzzyFilter}
      dataSource={cities}
    />
  )

  return (
    <div>
      {autocomplete}
      <List>
        <Subheader>World Cities</Subheader>
        {cityList}
      </List>
    </div>
  )
}

AddCityList.propTypes = {
  onAdd: PropTypes.func
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: (city) => () => dispatch(add_city(city))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCityList)
