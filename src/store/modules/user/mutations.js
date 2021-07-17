import { LocalStorage } from 'quasar'

export const setCurrentUser = (state, payload) => {
  state.currentUser = payload
  LocalStorage.set('currentUser', payload)
}

export const setProjects = (state, payload) => {
  state.projects.push(payload)
}

export const updateProjects = (state, payload) => {
  let projects = state.projects
  function getIgual(item) {
    var result = item.id === payload.id
    console.log()
    if (result) {
      item.data = payload.data
    }
  }
  projects.find(getIgual)
}

export const deleteProjects = (state, payload) => {
  let projects = state.projects
  function removeIgual(item, index) {
    console.log('index', index)
    var result = item.id === payload.id
    if (result) {
      projects.splice(index, 1);
    }
  }
  projects.find(removeIgual)

}

export const setSelectProject = (state, payload) => {
  state.selectProject = payload
}

export const setUser = (state, payload) => {
  state.user = payload
}

export const setGamer = (state, payload) => {
  state.gamer = payload
}

export const setLoja = (state, payload) => {
  state.loja.push(payload)
}

export const setUsuarios = (state, payload) => {
  state.usuarios.push(payload)
}

export const setSalvarUsuario = (state, payload) => {
  state.usuarios = payload
}

export const setMyDesafio = (state, payload) => {
  state.myDesafio.push(payload)
}

export const updateMyDesafio = (state, payload) => {
  let myDesafio = state.myDesafio
  function getIgual(item) {
    var result = item.id === payload.id
    console.log()
    if (result) {
      item.data = payload.data
    }
  }
  myDesafio.find(getIgual)
}

export const deleteMyDesafio = (state, payload) => {
  let myDesafio = state.myDesafio
  function removeIgual(item, index) {
    console.log('index', index)
    var result = item.id === payload.id
    if (result) {
      myDesafio.splice(index, 1);
    }
  }
  myDesafio.find(removeIgual)

}


export const setMembers = (state, payload) => {
  state.gamers.push(payload)
}

export const updateMembers = (state, payload) => {
  let gamers = state.gamers
  function getIgual(item) {
    var result = item.id === payload.id
    console.log()
    if (result) {
      item.data = payload.data
    }
  }
  gamers.find(getIgual)
}

export const deleteMembers = (state, payload) => {
  let gamers = state.gamers
  function removeIgual(item, index) {
    console.log('index', index)
    var result = item.id === payload.id
    if (result) {
      gamers.splice(index, 1);
    }
  }
  gamers.find(removeIgual)

}

export const setPontosMembers = (state, payload) => {
  state.pontos.push(payload)
}

export const updatePontosMembers = (state, payload) => {
  let pontos = state.pontos
  function getIgual(item) {
    var result = item.id === payload.id
    console.log()
    if (result) {
      item.data = payload.data
    }
  }
  pontos.find(getIgual)
}

export const deletePontosMembers = (state, payload) => {
  let pontos = state.pontos
  function removeIgual(item, index) {
    console.log('index', index)
    var result = item.id === payload.id
    if (result) {
      pontos.splice(index, 1);
    }
  }
  pontos.find(removeIgual)

}

export const setDialogLogin = (state, payload) => {
  state.dialogLogin = payload
}
