import firebase from 'firebase/app'
import 'firebase/auth' // eslint-disable-line
import 'firebase/database' // eslint-disable-line
import 'firebase/firestore' // eslint-disable-line
import 'firebase/functions' // eslint-disable-line
import 'firebase/storage' // eslint-disable-line
import { LocalStorage } from 'quasar'

const firebaseConfig = {
  apiKey: 'AIzaSyABYsQOsyuiN4tZRWek3-HUKP6yJ4oWnLg',
  authDomain: 'jornada-jovem.firebaseapp.com',
  databaseURL: 'https://jornada-jovem.firebaseio.com',
  projectId: 'jornada-jovem',
  storageBucket: 'jornada-jovem.appspot.com',
  messagingSenderId: 'G-2DFN87FKYD'
}
// console.log({ firebaseConfig })

// initialize Firebase from settings
const $fbApp = firebase.initializeApp(firebaseConfig)
const $auth = $fbApp.auth()
// const $db = firebase.database()
const $firestore = firebase.firestore()
const $functions = firebase.functions()
const $storage = firebase.storage()
// $firestore.settings({ timestampsInSnapshots: true })

// Enable logging
// const isDev = !!process.env.DEV;
// firebase.database.enableLogging(isDev)
// firebase.firestore.setLogLevel(isDev ? 'debug' : 'silent')

export default ({ Vue, store }) => {
  Vue.prototype.$fbApp = $fbApp
  Vue.prototype.$functions = $functions
  Vue.prototype.$auth = $auth

  const localUser = JSON.parse(LocalStorage.getItem('user') || '{}')
  store.commit('setCurrentUser', localUser)

  // watch user authentication state
  $auth.onAuthStateChanged(user => {
    if (user) {
      const { uid, email, emailVerified, displayName, photoURL, providerData } = user
      const providerId = providerData && providerData.length > 0 ? providerData[0].providerId : user.providerId;
      store.commit('setCurrentUser', { uid, email, emailVerified, displayName, photoURL, nome: displayName, providerId })
    } else {
      store.commit('setCurrentUser', null)
    }
  })
}

export { firebase, $fbApp, $auth, $firestore, $functions, $storage }
