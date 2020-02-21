import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as firebase from 'firebase'

// initital state

const initialState = {
  combos: [],
  colaborators: [],
  unidades: [],
  isUserLogged: false,
  name: null,
  email: null,
  avatar_url: ''
}

// reducer
const combos = (state = initialState, action) => {
  switch (action.type) {
    case 'setAvaliableCombos':
      return { ...state, combos: action.value }
    default:
      return state
  }
}

const colaborators = (state = initialState, action) => {
  switch (action.type) {
    case 'setAvaliableColaborators':
      return { ...state, colaborators: action.value }
    default:
      return state
  }
}

const unidades = (state = initialState, action) => {
  switch (action.type) {
    case 'setAvaliableUnidades':
      return { ...state, unidades: action.value }
    default:
      return state
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'userLoggedIn':
      return {
        ...state,
        name: action.value.name,
        avatar_url: action.value.avatar_url,
        isUserLogged: true
      }
    case 'createUser':
      return {
        ...state,
        isUserLogged: true
      }
    case 'userLoggedOut':
      return {
        ...state,
        avatar_url: '',
        isUserLogged: false
      }
    default:
      return state
  }
}

// combos action
const setAvaliableCombos = comboData => {
  return {
    type: 'setAvaliableCombos',
    value: comboData
  }
}

const watchComboData = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref('combos')
      .on(
        'value',
        snapshot => {
          var comboData = Object.values(snapshot.val())
          dispatch(setAvaliableCombos(comboData))
        },
        err => {
          console.log(err.message)
        }
      )
  }
}

//colaboradores actions
const setAvaliableColaborators = colaboratorData => {
  return {
    type: 'setAvaliableColaborators',
    value: colaboratorData
  }
}

const watchColaboratorData = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref('profissionais')
      .on(
        'value',
        snapshot => {
          var colaboratorData = Object.values(snapshot.val())
          dispatch(setAvaliableColaborators(colaboratorData))
        },
        err => {
          console.log(err.message)
        }
      )
  }
}

//unidades actions
const setAvaliableUnidades = unidadeData => {
  return {
    type: 'setAvaliableUnidades',
    value: unidadeData
  }
}

const watchUnidadeData = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref('unidades')
      .on(
        'value',
        snapshot => {
          var unidadeData = Object.values(snapshot.val())
          dispatch(setAvaliableUnidades(unidadeData))
        },
        err => {
          console.log(err.message)
        }
      )
  }
}

//user action
const logIn = user => {
  return {
    type: 'userLoggedIn',
    value: user
  }
}

const createUser = user => {
  return {
    type: 'createUser',
    value: user
  }
}

const logOut = () => {
  return {
    type: 'userLoggedOut'
  }
}

//store

const reducers = combineReducers({
  combos,
  user,
  colaborators,
  unidades
})
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
const persistor = persistStore(store)

export { store, persistor }

export {
  watchComboData,
  setAvaliableCombos,
  watchColaboratorData,
  setAvaliableColaborators,
  setAvaliableUnidades,
  watchUnidadeData,
  logIn,
  createUser,
  logOut
}
