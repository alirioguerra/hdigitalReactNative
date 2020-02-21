import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'
import { TabBarLabel, TabBarIcon } from '../components/TabBarElements'
import Colors from '../constants/Colors'
import Profile from '../screens/Profile'
import Combos from '../screens/userFlow/Combos'
import Unidades from '../screens/userFlow/Unidades'
import Profissional from '../screens/userFlow/Profissional'
import Finalizar from '../screens/userFlow/Finalizar'
import Login from '../screens/Login'
import Register from '../screens/Register'
import loadingScreen from '../screens/loadingScreen'

const authRouter = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register }
  },
  {
    initialRouteName: 'Login'
  }
)
const loginOrProfile = createSwitchNavigator(
  {
    Profile: { screen: Profile },
    Auth: { screen: authRouter },
    loadingScreen: { screen: loadingScreen }
  },
  { initialRouteName: 'loadingScreen' }
)

const UserFlow = createStackNavigator(
  {
    Combos: {
      screen: Combos
    },
    Unidades: {
      screen: Unidades
    },
    Profissional: {
      screen: Profissional
    },
    Finalizar: {
      screen: Finalizar
    }
  },
  {
    initialRouteName: 'Combos',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.white
      },
      headerTintColor: Colors.tintColor,
      headerTitleStyle: {
        fontFamily: 'regular',
        fontWeight: '200',
        fontSize: 16
      }
    }
  }
)

const RootStack = createBottomTabNavigator(
  {
    Home: {
      name: 'Home',
      screen: UserFlow,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel focused={focused} title={'início'} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'home'} />
        )
      }
    },

    Profile: {
      screen: loginOrProfile,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel focused={focused} title={'perfil'} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={'user'} />
        )
      }
    }
  },
  { initialRouteName: 'Home' }
)

const AppNavigation = createAppContainer(RootStack)

export default AppNavigation
