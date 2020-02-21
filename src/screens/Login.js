import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native'
import { Image, Input, SocialIcon } from 'react-native-elements'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { logIn } from '../redux/appRedux'
import Icon from 'react-native-vector-icons/Feather'
import styles from '../styles/Main.style'
import Colors from '../constants/Colors'

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      text: ''
    }
  }

  login = () => {
    const { navigation } = this.props
    const text = navigation.getParam('text')
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.onLogin({ ...this.state })
          if (!text) {
            this.props.navigation.navigate('loadingScreen')
          } else {
            this.props.navigation.navigate('Finalizar')
          }
        },
        err => {
          Alert.alert(err.message)
        }
      )
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '165799957669991',
      { permissions: ['public_profile'] }
    )

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(user => {
          // add user data to  DB
          firebase
            .database()
            .ref('users/' + user.user.uid)
            .set({
              name: user.user.displayName,
              avatar_url: user.user.photoURL
            })

          //add user data to storage
          this.props.onLogin({
            name: user.user.displayName,
            email: user.user.email,
            avatar_url: user.user.photoURL,
            isUserLogged: true
          })
          this.props.navigation.navigate('loadingScreen')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  register = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/img/imagebg.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <Image
          source={require('../../assets/img/logo.png')}
          containerStyle={{
            marginTop: '40%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <View style={styles.container}>
          <Input
            placeholder="email"
            inputContainerStyle={styles.input}
            leftIconContainerStyle={{ marginRight: 20 }}
            inputStyle={{ color: Colors.gray }}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            leftIcon={
              <Icon name="mail" size={16} color={Colors.tabIconSelected} />
            }
          />
          <Input
            placeholder="senha"
            inputContainerStyle={styles.input}
            leftIconContainerStyle={{ marginRight: 20 }}
            inputStyle={{ color: Colors.gray }}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            leftIcon={
              <Icon name="lock" size={16} color={Colors.tabIconSelected} />
            }
          />
          <TouchableOpacity onPress={this.login} style={{ marginVertical: 20 }}>
            <Text style={{ color: Colors.white, fontSize: 16 }}>entrar</Text>
          </TouchableOpacity>
          <SocialIcon
            title="registrar ou entrar com facebook"
            button
            type="facebook"
            fontFamily="light"
            iconSize={18}
            onPress={() => this.loginWithFacebook()}
            style={{ paddingHorizontal: 10 }}
          />
          <View style={{ position: 'absolute', bottom: '5%' }}>
            <TouchableOpacity onPress={this.register}>
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(logIn(user))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
