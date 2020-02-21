import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  watchComboData,
  watchColaboratorData,
  watchUnidadeData
} from '../../redux/appRedux'
import Carousel from 'react-native-snap-carousel'
import { sliderWidth, itemWidth } from '../../styles/Slide.style'
import SliderEntry from '../../components/ComboSlide'
import styles from '../../styles/Main.style'

const SLIDER_1_FIRST_ITEM = 0

class Combos extends React.Component {
  static navigationOptions = {
    title: 'Escolha seu combo'
  }

  constructor(props) {
    super(props)
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      combos: this.props.combos
    }
    this.props.watchComboData()
    this.props.watchColaboratorData()
    this.props.watchUnidadeData()
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} />
  }

  mainSlide() {
    onSelectCombo = () => {
      this.props.navigation.navigate('Unidades', {
        comboPicked: this.props.combos[this.state.slider1ActiveSlide]
      })
    }

    return (
      <View>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.props.combos}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={false}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.8}
          loop={false}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
      </View>
    )
  }

  render() {
    const mainSlide = this.mainSlide()
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>{mainSlide}</View>
        <View style={{ padding: 10, width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSelectCombo()}>
            <Text style={styles.buttonText}>quero esse</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({ combos }) => {
  return {
    combos: combos.combos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    watchComboData: () => {
      dispatch(watchComboData())
    },
    watchColaboratorData: () => {
      dispatch(watchColaboratorData())
    },
    watchUnidadeData: () => {
      dispatch(watchUnidadeData())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Combos)
