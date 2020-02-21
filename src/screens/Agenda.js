import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import styles from '../styles/Main.style'
import Colors from '../constants/Colors'

const list = [
  {
    comboImg:
      'https://firebasestorage.googleapis.com/v0/b/hdigital-7a774.appspot.com/o/vanilla.png?alt=media&token=b369e08d-140b-4b36-b539-ca04a053632f',
    combo: 'Vanilla cream hair',
    unidade: 'Hélio Lago Sul',
    profissional: 'Mayanne Santos',
    dia: '13/04'
  }
]

export default class AgendaStack extends React.Component {
  static navigationOptions = {
    title: 'Meus horários'
  }

  constructor(props) {
    super(props)
    this.state = {
      items: {}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Funcionalidade em desenvolvimento</Text>
        {/* <View style={styles.boxContainer}>
          {list.map((item, index) => (
            <ListItem
              key={index}
              leftElement={
                <View
                  style={{
                    backgroundColor: Colors.lightGray,
                    borderRadius: 50,
                    paddingVertical: 20,
                    paddingHorizontal: 10
                  }}
                >
                  <Text style={[styles.fontLight, { color: Colors.tintColor }]}>
                    {item.dia}
                  </Text>
                </View>
              }
              title={item.combo}
              titleStyle={styles.fontLight}
              subtitle={item.unidade}
              subtitleStyle={styles.fontLight}
              bottomDivider={true}
              rightIcon={() => (
                <Icon
                  type="feather"
                  name={"plus"}
                  color={Colors.tintColor}
                  size={16}
                />
              )}
              onPress={() => console.log("Works!")}
              activeOpacity={0.9}
            />
          ))}
        </View> */}
      </View>
    )
  }
}
