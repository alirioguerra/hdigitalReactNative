import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/Main.style'

const CommomHeader = props => (
  <View style={styles.header}>
    <Text style={styles.fontRegular}>{props.title}</Text>
    <Text style={styles.fontLight}>{props.subtitle}</Text>
  </View>
)

export default CommomHeader
