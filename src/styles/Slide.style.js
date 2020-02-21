import { StyleSheet, Dimensions, Platform } from 'react-native'
import Colors from '../constants/Colors'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideWidth = wp(90)
const itemHorizontalMargin = wp(2)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth

export default StyleSheet.create({
  slideInnerContainer: {
    flex: 1,
    width: itemWidth,
    overflow: 'hidden',
    borderRadius: 20
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: Colors.white
  }
})
