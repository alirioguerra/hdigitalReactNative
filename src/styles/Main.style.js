import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../constants/Colors'

const commomWidth = Dimensions.get('window').width - 20

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
  },
  boxContainer: {
    width: commomWidth
  },
  shadowBoxContainer: {
    backgroundColor: Colors.white,
    width: commomWidth,
    padding: 15,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: Colors.gray,
    elevation: 5,
    marginVertical: 20
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  fontLight: {
    color: Colors.gray,
    fontFamily: 'light',
    fontSize: 14
  },
  fontRegular: {
    color: Colors.tintColor,
    fontFamily: 'regular',
    fontSize: 18
  },
  sliderContentContainer: {
    paddingVertical: 10
  },
  button: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.tintColor,
    borderRadius: 25,
    width: '80%'
  },
  buttonText: {
    fontFamily: 'regular',
    textAlign: 'center',
    color: Colors.tintColor,
    fontSize: 14,
    paddingVertical: 10
  },
  input: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderBottomWidth: 0
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.tintColor
  }
})
