import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { logIn } from '../redux/appRedux'
import styles from '../styles/Main.style'
import colors from '../constants/Colors'
import * as firebase from 'firebase'

class loadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      if (this.props.isUserLogged) {
        const user = firebase.auth().currentUser
        const userfire = firebase.database().ref('/users/' + user.uid) + '.json'
        fetch(userfire)
          .then(res => res.json())
          .then(user => {
            if (this.props.name == '' || this.props.avatar_url == '')
              this.props.onLogin({
                name: user.name,
                avatar_url: user.avatar_url
              })

            this.props.navigation.navigate('Profile')
          })
      } else {
        this.props.navigation.navigate('Login')
      }
    }, 900)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ActivityIndicator
            style={{ flex: 1, alignItems: 'center' }}
            size="large"
            color={colors.tintColor}
          />
        </View>
      </View>
    )
  }
}

const mapSateToProps = ({ user }) => {
  return {
    isUserLogged: user.isUserLogged,
    name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(logIn(user))
  }
}

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(loadingScreen)
