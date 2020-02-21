import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native'
import { Image, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { createUser } from '../redux/appRedux'
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/Feather'
import styles from '../styles/Main.style'
import Colors from '../constants/Colors'

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  login = () => {
    this.props.navigation.navigate('Login')
  }

  onCreateUser = () => {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('As senhas não são iguais')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        user => {
          firebase
            .database()
            .ref('users/' + user.user.uid)
            .set({
              name: this.state.name,
              avatar_url:
                'https://252radio.com/wp-content/uploads/2016/11/default-user-image.png',
              email: this.state.email
            })
          this.props.onRegister({ ...this.state })
          this.props.navigation.navigate('Profile')
        },
        err => {
          Alert.alert(err.message)
        }
      )
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
            marginTop: '20%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <View style={styles.container}>
          <Input
            placeholder="nome"
            inputContainerStyle={styles.input}
            leftIconContainerStyle={{ marginRight: 20 }}
            inputStyle={{ color: Colors.gray }}
            autoFocus={true}
            autoCompleteType={false}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            leftIcon={
              <Icon name="user" size={16} color={Colors.tabIconSelected} />
            }
          />
          <Input
            placeholder="email"
            inputContainerStyle={styles.input}
            leftIconContainerStyle={{ marginRight: 20 }}
            inputStyle={{ color: Colors.gray }}
            keyboardType="email-address"
            value={this.state.email}
            autoCorrect={false}
            autoCapitalize="none"
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

          <Input
            placeholder="confirmar senha"
            inputContainerStyle={styles.input}
            leftIconContainerStyle={{ marginRight: 20 }}
            inputStyle={{ color: Colors.gray }}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            leftIcon={
              <Icon name="lock" size={16} color={Colors.tabIconSelected} />
            }
          />
          <TouchableOpacity
            onPress={this.onCreateUser}
            style={{ marginVertical: 20 }}>
            <Text style={{ color: Colors.white, fontSize: 16 }}>registrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: user => dispatch(createUser(user))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
