import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import SlideStyles from '../styles/Slide.style'
import FitImage from 'react-native-fit-image'

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  get image() {
    const {
      data: { illustration }
    } = this.props

    return (
      <FitImage
        source={{ uri: illustration }}
        resizeMode="contain"
        indicatorSize="large"
        borderRadius={20}
      />
    )
  }

  render() {
    const {
      data: { title }
    } = this.props
    return (
      <View activeOpacity={1} style={SlideStyles.slideInnerContainer}>
        <View style={SlideStyles.imageContainer}>{this.image}</View>
      </View>
    )
  }
}
