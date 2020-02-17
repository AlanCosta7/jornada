import { LocalStorage } from 'quasar'

export const setCurrentUser = (state, payload) => {
  state.currentUser = payload
  LocalStorage.set('user', JSON.stringify(payload))
}

export const setCards = (state, payload) => {
  console.log('OK Card')
  state.cards = payload
}

export const setBlock = (state, payload) => {
  console.log('OK jornada')
  state.block = payload
}

export const setLoja = (state, payload) => {
  console.log('OK loja')
  state.loja.push(payload)
}

export const setCla = (state, payload) => {
  console.log('OK Cla')
  state.cla = payload
}