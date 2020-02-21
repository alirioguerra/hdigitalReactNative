import React from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import CommomHeader from '../../components/CommomHeader'
import styles from '../../styles/Main.style'
import Colors from '../../constants/Colors'
import { DATAS } from '../../static/datas'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id)
  }

  render() {
    const buttonColor = this.props.selected === this.props.id ? Colors.tintColor : Colors.white
    const textColor = this.props.selected === this.props.id ? Colors.white : Colors.tintColor
    return (
      <TouchableOpacity style={{
        padding: 10, 
        margin: 10, 
        borderRadius: 10, 
        backgroundColor: buttonColor,
        shadowOffset:{width: 0,  height: 3,},
        shadowOpacity: .2,
        shadowRadius: 5,
        shadowColor: Colors.gray,
        elevation: 5,}}
        onPress={this._onPress}>
        <View>
          <Text style={[styles.fontRegular, {color: textColor}]}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class Horario extends React.Component {
  
  static navigationOptions = {
    title: 'Escolha a data',
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: 0,
      selectedHour: 0,
      stringHour: ''
    }
  }

  _onPressItem = (id) => {
    this.setState({selectedDay: id})
  }
  _onpressHour = id => this.setState({selectedHour: id})

  _keyExtractor = (item, index) => index.toString()

  _renderDay = ({item, index}) => (
    <MyListItem
      id={index}
      onPressItem={this._onPressItem}
      selected={this.state.selectedDay}
      title={item.dia}
    />
  )

  _renderHours = ({item, index}) => (
    <MyListItem
      id={index}
      onPressItem={this._onpressHour}
      selected={this.state.selectedHour}
      title={item}
    />
  )

  render() {
    const { navigation } = this.props
    const comboPicked = navigation.getParam('comboPicked', 'NO-ID')
    const unidadePicked = navigation.getParam('unidadePicked', 'NO-ID')
    const profissionalPicked = navigation.getParam('profissionalPicked', 'NO-ID')

    return (
      <View>
       <CommomHeader title={comboPicked.title} subtitle={comboPicked.description} />
        <View>
          <FlatList
            style={{backgroundColor: Colors.lightGray}}
            horizontal
            data={DATAS}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderDay} />
          <FlatList
            style={{marginVertical: 20}}
            horizontal
            data={DATAS[this.state.selectedDay].hora}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderHours} />
          </View>
        <View style={[styles.container, {marginTop: "95%"}]}>
          <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 0}]} 
            onPress={() => this.props.navigation.navigate('Finalizar', {datePicked: `${DATAS[this.state.selectedDay].dia} às ${DATAS[this.state.selectedDay].hora[this.state.selectedHour]}`, unidadePicked, comboPicked, profissionalPicked})} >
           <Text style={styles.buttonText}>agendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
