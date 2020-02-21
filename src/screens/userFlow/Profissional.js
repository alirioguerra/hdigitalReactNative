import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { ListItem, Rating } from 'react-native-elements'
import { connect } from 'react-redux'
//import { watchColaboratorData } from '../../redux/appRedux'
import CommomHeader from '../../components/CommomHeader'
import Colors from '../../constants/Colors'
import styles from '../../styles/Main.style'

class Profissional extends React.Component {
  static navigationOptions = {
    title: 'Escolha o profissinal'
  }
  constructor(props) {
    super(props)
    this.state = {
      colaborators: this.props.colaborators
    }
    //this.props.watchColaboratorData()
  }
  render() {
    const { navigation } = this.props
    const comboPicked = navigation.getParam('comboPicked', 'NO-ID')
    const unidadePicked = navigation.getParam('unidadePicked', 'NO-ID')
    return (
      <View>
        <CommomHeader
          title={comboPicked.title}
          subtitle={comboPicked.description}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.boxContainer}>
              {this.state.colaborators.map((item, i) => (
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate('Finalizar', {
                      profissionalPicked: item,
                      unidadePicked,
                      comboPicked
                    })
                  }
                  underlayColor="transparent"
                  key={i}
                  contentContainerStyle={{ alignItems: 'flex-start' }}
                  leftAvatar={{
                    rounded: true,
                    size: 'medium',
                    // showEditButton: true,
                    // editButton: {
                    //   name: 'plus',
                    //   type: 'feather',
                    //   color: '#fff',
                    //   size: 20,
                    //   underlayColor: 'transparent',
                    //   onPress: () => Alert.alert('perfil do profissional')
                    // },
                    source: { uri: item.profissionalAvatar }
                  }}
                  title={item.profissionalName}
                  titleStyle={styles.fontRegular}
                  subtitleStyle={styles.fontLight}
                  subtitle={
                    <Rating
                      type="heart"
                      readonly
                      startingValue={5}
                      ratingCount={5}
                      imageSize={18}
                    />
                  }
                  chevronColor={Colors.gray}
                  chevron
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

const mapStateToProps = state => {
  return {
    colaborators: state.colaborators.colaborators
  }
}

const mapDispatchToProps = dispatch => {
  return {
    watchColaboratorData: () => {
      dispatch(watchColaboratorData())
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(Profissional)
