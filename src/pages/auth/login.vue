<template>
  <q-page class="page-login bg-primary">
    <q-layout class="flex flex-center column">
      <div class="bg-tertiary">
        <router-link to="/" />
      </div>
      <div class="flex flex-center">
        <div v-show="!currentUser" class="flex flex-center column">
          <h2 class="text-white my-font">
            Sua jornada começa aqui 
          </h2>
          <div class="q-pa-xl" id="firebaseui-auth-container" />
        </div>
        <div v-show="currentUser" class="flex flex-center column">
          <h2 class="text-white text-bold">
            Redirecionando...
          </h2>
          <p class="subtitulo my-font text-white">
            Você já está conectado!
          </p>
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<script>
  import Vuex from 'vuex'
  import { firebase } from '../../boot/firebase.js'
  import { Loading, QSpinnerOval } from 'quasar'

  export default {
    name: 'PageLogin',
    meta: { title: 'Jornada - Login' },
    data() {
      return {}
    },
    computed: {
      ...Vuex.mapGetters(['currentUser'])
    },
    watch: {
      currentUser(newUser, oldUser) {
        if (newUser) {
          // user is logged, so... lets redirect to App
          this.redirectToApp(1000)
        }
      }
    },
    mounted() {
      if (this.currentUser) {
        const rediretDelay = 2000
        this.redirectToApp(rediretDelay)
        return
      }
      // Confgiure and add the FirebaseUI Widget
      let signInFlow = 'popup'
      // For iOS full screen apps we use the redirect auth mode.
      if ('standalone' in window.navigator && window.navigator.standalone) {
        signInFlow = 'redirect'
      }

      const uiConfig = {
        signInFlow: signInFlow,
        // signInSuccessUrl: '/auth/success',
        // signInSuccessUrl: '/app/projects',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
          //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        //tosUrl: '/legal/privacy',
        //privacyPolicyUrl: '/legal/privacy',
        callbacks: {
          uiShown: function() {
            // The widget is rendered.

            // Update text content of buttons
            updateLabels()

            function updateLabels() {
              const elGoogle = document.querySelector('.firebaseui-idp-google .firebaseui-idp-text-long')
              const elFacebook = document.querySelector('.firebaseui-idp-facebook .firebaseui-idp-text-long')
              // const elEmail = document.querySelector('.firebaseui-idp-password .firebaseui-idp-text-long')
              const elementsExists = elGoogle && elFacebook /* && elEmail */
              if (!elementsExists) {
                window.requestAnimationFrame(updateLabels)
              } else {
                elGoogle.textContent = 'Acessar com Google'
                elFacebook.textContent = 'Acessar com Facebook'
                // elEmail.textContent = 'Acessar com Email'
              }
            }
          }
        }
      }
      this.$firebaseui.start('#firebaseui-auth-container', uiConfig)
    },
    methods: {
      ...Vuex.mapActions(['logout']),
      redirectToApp(redirectDelay) {
        Loading.show({ spinner: QSpinnerOval, message: 'Entrando...'})
        setTimeout(() => {
        Loading.hide()
          this.$router.replace({ name: 'projects' })
        }, redirectDelay)
      },
    }
  }
</script>


<style scope>

  .page-login .base-logo {
    max-width: 200px;
  }

  .cardImg {
    margin-top: -110px;
  }

  .page-login .subtitulo {
    font-size: 1.5em;
  }

  .page-login .firebaseui-idp-button {
    max-width: 300px;
    min-height: 60px;
    border-radius: 30px;
  }

  .page-login .firebaseui-idp-text {
    font-size: 18px;
  }

  .page-login h1 {
    font-size: 56px;
    font-weight: 200;
  }

  .page-login h2 {
    font-size: 28px;
    font-weight: 300;
    margin: 0;
    padding: 0;
  }

  @media only screen and (max-width: 480px) {
    .page-login h1 {
      font-size: 10vw;
    }

    .page-login h2 {
      font-size: 10vw;
    }

    .page-login .q-layout-footer .q-btn {
      display: block;
    }

    .page-login .firebaseui-idp-button {
      max-width: 100%;
      min-height: 60px;
      border-radius: 30px;
    }

    /* .firebaseui-list-item {
    } */
    .page-login .firebaseui-card-content {
      padding: 0;
    }
  }
</style>
