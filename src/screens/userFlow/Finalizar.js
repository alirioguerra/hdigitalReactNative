import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from '../../styles/Main.style'

class Finalizar extends React.Component {
  static navigationOptions = {
    title: 'Agendar horário'
  }

  render() {
    shareToWhatsAppWithContact = (text, phoneNumber) => {
      Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`)
    }

    const { navigation } = this.props
    const comboPicked = navigation.getParam('comboPicked', 'NO-ID')
    const unidadePicked = navigation.getParam('unidadePicked', 'NO-ID')
    const profissionalPicked = navigation.getParam(
      'profissionalPicked',
      'NO-ID'
    )
    // const datePicked = navigation.getParam('datePicked', 'NO-ID')
    const text = `gostaria de agendar um *${
      comboPicked.title
    }* na unidade do *${unidadePicked.unidadeName}* com a *${
      profissionalPicked.profissionalName
    }*`

    return (
      <View style={styles.container}>
        <Text style={styles.textRegular}>{comboPicked.title}</Text>
        <Text style={styles.textRegular}>{unidadePicked.unidadeName}</Text>
        <Text style={styles.textRegular}>
          {profissionalPicked.profissionalName}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.props.isUserLogged) {
              shareToWhatsAppWithContact(text, '5561994581611')
            } else {
              Alert.alert(
                'Antenção',
                'Você precisa estar logado(a) para agendar.',
                [
                  {
                    text: 'Depois',
                    onPress: () => console.log('Ask me later pressed')
                  },
                  {
                    text: 'Entrar',
                    onPress: () =>
                      this.props.navigation.navigate('Login', { text })
                  }
                ],
                { cancelable: false }
              )
            }
          }}>
          <Text style={styles.buttonText}>confirmar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isUserLogged: user.isUserLogged
  }
}

export default connect(
  mapStateToProps,
  null
)(Finalizar)

const styles = StyleSheet.create({
  container: {
    ...Styles.container,
    justifyContent: 'center'
  },
  textRegular: {
    ...Styles.fontRegular,
    textAlign: 'center'
  },
  textLight: {
    ...Styles.fontLight,
    paddingVertical: 20
  },
  button: {
    ...Styles.button,
    position: 'absolute',
    bottom: '2%'
  },
  buttonText: {
    ...Styles.buttonText
  }
})
