import React from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
//import { watchUnidadeData } from '../../redux/appRedux'
import { ListItem, Icon } from 'react-native-elements'
import CommomHeader from '../../components/CommomHeader'
import styles from '../../styles/Main.style'
import Colors from '../../constants/Colors'

class Unidades extends React.Component {
  static navigationOptions = {
    title: 'Escolha a unidade'
  }

  constructor(props) {
    super(props)
    this.state = {
      unidades: this.props.unidades
    }
    //this.props.watchUnidadeData()
  }

  render() {
    const { navigation } = this.props
    const comboPicked = navigation.getParam('comboPicked', 'NO-ID')

    return (
      <View>
        <CommomHeader
          title={comboPicked.title}
          subtitle={comboPicked.description}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.boxContainer}>
              {this.state.unidades.map((item, i) => (
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate('Profissional', {
                      unidadePicked: item,
                      comboPicked
                    })
                  }
                  underlayColor="transparent"
                  key={i}
                  title={item.unidadeName}
                  titleStyle={styles.fontRegular}
                  subtitle={item.unidadeAvatar}
                  subtitleStyle={styles.fontLight}
                  chevronColor={Colors.gray}
                  chevron
                  leftIcon={() => (
                    <Icon
                      type="feather"
                      name="map-pin"
                      color={Colors.tintColor}
                      size={16}
                    />
                  )}
                  bottomDivider={true}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ unidades }) => {
  return {
    unidades: unidades.unidades
  }
}

const mapDispatchToProps = dispatch => {
  return {
    watchUnidadeData: () => {
      dispatch(watchUnidadeData())
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(Unidades)
