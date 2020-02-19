import { pick } from 'lodash-es'
import { $auth, $firestore, firebase } from 'boot/firebase'
import { getCommonsIds } from '../../shared/helper'
import { Loading, QSpinnerOval } from 'quasar'

export const getUserById = ({ }, userId) => {
  return $firestore.collection('users').doc(userId)
}

export const createUserWithEmailAndPassword = ({ commit }, payload) => {
  commit('setLoading', true)
  commit('clearError')
  $auth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => handleSuccess(commit, user))
    .catch(error => handleError(commit, error))
}

export const signInWithEmailAndPassword = ({ commit }, payload) => {
  commit('setLoading', true)
  commit('clearError')
  return $auth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => handleSuccess(commit, user))
    .catch(error => handleError(commit, error))
}

export const signInWithPopup = ({ commit }) => {
  commit('setLoading', true)
  commit('clearError')
  return $auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => handleSuccess(commit, user))
    .catch(error => handleError(commit, error))
}

export const logout = async ({ commit }) => {
  await $auth.signOut()
  commit('setCurrentUser', null)
}

export const createOrUpdateOnFirestore = async ({ commit }, payload) => {
  const newUser = {
    id: payload.uid,
    name: payload.displayName,
    email: payload.email,
    photoUrl: payload.photoURL,
    cla: "amor",
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    0: 0,
    jcoins: 0,
    saida: 0
  }
  await $firestore
    .collection('users')
    .doc(payload.uid)
    .set(newUser, { merge: true })
  return newUser
}

export const updateUser = async ({ commit }) => {
  Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })

  const cards = await $firestore
    .collection('users')
    .orderBy("desempenho", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
          commit('setUsuarios', doc.data())
          Loading.hide()
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  Loading.hide()
  return cards
}


export const salvarUsuario = async ({ commit }, payload) => {
  commit('setSalvarUsuario', payload)
}

export const updateJcoins = async ({ rootState }, payload) => {
  const validKeys = ['saida']  
  const newCompra = pick(payload, validKeys)
  const { uid } = getCommonsIds({ rootState })  
  const jcoins = await $firestore
    .collection('users')
    .doc(uid)
    .update(newCompra)
  return jcoins
}

export const setComprar = async ({ rootState }, payload) => {
 
  const jcoins = await $firestore
    .collection('comprado')
    .doc()
    .set(payload)
  return jcoins
}

export const blockJornada = async ({ commit }) => {
  Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })

  const cards = await $firestore
    .collection('jornada')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
          commit('setBlock', doc.data())
          Loading.hide()
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
    Loading.hide()
    return cards
}

export const addLoja = async ({ commit }) => {
  Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })

  const loja = await $firestore
    .collection('loja')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        commit('setLoja', doc.data())
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

    Loading.hide()
}

export const userCadastrado = async ({ rootState, commit }) => {
  const { uid } = getCommonsIds({ rootState })
  Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })

  const cards = await $firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === uid) {
          commit('setCards', doc.data())
          Loading.hide()
      }
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
    Loading.hide()
}

export const mediaCla = async ({ commit, state }) => {
  Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })

  var cla = state.cards.cla

  const cards = await $firestore
    .collection(cla)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        commit('setCla', doc.data())
        Loading.hide()
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
    Loading.hide()
    return cards
}

export const updateUsuario = async ({ rootState }, payload) => {
  var uid = payload.uid
  var jcoins = {jcoins: payload.jcoins}
  console.log('newCompra', jcoins)
  const user = await $firestore
    .collection('users')
    .doc(uid)
    .update(jcoins)
  return user
}

export const removeUsuario = async ({ rootState }, payload) => {
  const user = await $firestore
    .collection('users')
    .doc(payload)
    .delete()
  return user
}

function handleSuccess(commit, user) {
  commit('setLoading', false)
  commit('setCurrentUser', user)
}

function handleError(commit, error) {
  commit('setLoading', false)
  commit('setError', error)
  console.log(error)
}
