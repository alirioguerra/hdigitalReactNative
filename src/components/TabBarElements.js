import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Colors from '../constants/Colors'

export const TabBarIcon = (props) => {
    return (
      <Icon
        name={props.name}
        size={22}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }

export const TabBarLabel = (props) => {
  return (
    <Text style={[styles.tabBarLabel,  props.focused? styles.tabBarLabelActive : {}]} >{props.title}</Text>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'regular',
    fontSize: 12,
    textAlign: 'center'
  },
  tabBarLabelActive: {
    color: Colors.tabIconSelected
  }
})