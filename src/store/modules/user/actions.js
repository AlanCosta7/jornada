import { $auth, $firestore, firebase } from 'boot/firebase'
import { assert, getCommonsIds, mapQuerySnapshot } from '../../shared/helper'
import { Loading } from 'quasar'

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
    sexo: payload.sexo,
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
    jcoins: 0
  }
  await $firestore
    .collection('users')
    .doc(payload.uid)
    .set(newUser, { merge: true })
  return newUser
}

export const userCadastrado = async ({ rootState, commit }) => {
  const { uid } = getCommonsIds({ rootState })
  Loading.show()

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

function handleSuccess(commit, user) {
  commit('setLoading', false)
  commit('setCurrentUser', user)
}

function handleError(commit, error) {
  commit('setLoading', false)
  commit('setError', error)
  console.log(error)
}
