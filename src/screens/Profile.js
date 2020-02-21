import React from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { logOut } from '../redux/appRedux'
import * as firebase from 'firebase'
import { ListItem } from 'react-native-elements'
import ContentBox from '../components/ContentBox'
import styles from '../styles/Main.style'

class ProfileStack extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      avatar_url: this.props.avatar_url
    }
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.props.onLogOut()
          this.props.navigation.navigate('Login')
        },
        err => {}
      )
  }

  render() {
    return (
      <View>
        <View style={{ marginTop: '10%' }}>
          <ListItem
            style={{ paddingVertical: 20 }}
            leftAvatar={{
              source: {
                uri:
                  !this.state.avatar_url === ''
                    ? 'https://252radio.com/wp-content/uploads/2016/11/default-user-image.png'
                    : this.state.avatar_url
              },
              size: 'large',
              containerStyle: styles.avatar
            }}
            title={this.state.name}
            titleStyle={styles.fontRegular}
            subtitle={'Cliente H.Digital'}
            subtitleStyle={styles.fontLight}
            chevron
          />
        </View>
        <ScrollView>
          <ContentBox
            testeFunction={param => {
              if (param) this.props.navigation.navigate(param)
            }}
          />
          <View
            style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.logOut}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapSateToProps = ({ user }) => {
  return {
    name: user.name,
    avatar_url: user.avatar_url
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(logOut())
  }
}
export default connect(
  mapSateToProps,
  mapDispatchToProps
)(ProfileStack)
