import React from 'react'
import { View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import styles from '../styles/Main.style'
import Colors from '../constants/Colors'

export default class ContentBox extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const list = [
      {
        title: 'Mensagens',
        icon: 'clock',
        divider: true,
        navigation: 'loadingScreen'
      },
      {
        title: 'Pagamentos',
        icon: 'credit-card',
        divider: true
      },
      {
        title: 'Histórico de atendimentos',
        icon: 'list'
      }
    ]
    return (
      <View style={styles.container}>
        <View style={styles.shadowBoxContainer}>
          {list.map((item, i) => (
            <ListItem
              onPress={() => this.props.testeFunction(item.navigation)}
              underlayColor="transparent"
              key={i}
              title={item.title}
              titleStyle={styles.fontLight}
              leftIcon={() => (
                <Icon
                  type="feather"
                  name={item.icon}
                  color={Colors.gray}
                  size={16}
                />
              )}
              chevronColor={Colors.gray}
              chevron
              bottomDivider={item.divider}
            />
          ))}
        </View>
      </View>
    )
  }
}
