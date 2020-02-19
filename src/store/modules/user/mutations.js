import { LocalStorage } from 'quasar'

export const setCurrentUser = (state, payload) => {
  state.currentUser = payload
  LocalStorage.set('user', JSON.stringify(payload))
}

export const setCards = (state, payload) => {
  state.cards = payload
}

export const setBlock = (state, payload) => {
  state.block = payload
}

export const setLoja = (state, payload) => {
  state.loja.push(payload)
}

export const setCla = (state, payload) => {
  state.cla = payload
}

export const setUsuarios = (state, payload) => {
  state.usuarios.push(payload)
}