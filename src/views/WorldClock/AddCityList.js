import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import ContentAddIcon from 'material-ui/lib/svg-icons/content/add'
import Colors from 'material-ui/lib/styles/colors'
import AutoComplete from 'material-ui/lib/auto-complete'

import moment from 'moment-timezone'

import { add_city } from 'redux/modules/worldclock'

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
      <List subheader='World Cities'>
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
