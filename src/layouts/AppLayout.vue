<template>
  <q-layout view="hHh Lpr lff"  class="row fit justify-center bg-blue-grey-1">
    <q-header
      class="row bg-black justify-center"
      reveal
      elevated
      >
      <q-toolbar>
        <q-toolbar-title v-if="selectProject && selectProject.data && selectProject.data.displayName" @click="home" class="text-white text-weight-bolder">
          {{selectProject.data.displayName}}
        </q-toolbar-title>
        <q-btn
          aria-label="perfil"
          size="md"
          icon="menu"
          flat
          @click="drawer = !drawer"
          round
        >
        </q-btn>

      </q-toolbar>

        <q-toolbar v-if="selectProject"  inset>
        </q-toolbar>

      <q-img
         v-if="selectProject && selectProject.data && selectProject.data.capa"
        class="header-image absolute-top"
        alt="imagem de capa"
        :ratio="16/9"
        width="100vw"
        :src="selectProject.data.capa"
        spinner-color="primary"
        spinner-size="82px"
      />
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :behavior="mobile ? 'mobile': 'desktop'"
      :breakpoint="400"
      bordered
      class="bg-grey-3"
    >
        <q-list padding>
            <q-item clickable v-ripple @click="onDashboard()">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="onDesafio()">
              <q-item-section avatar>
                <q-icon name="security" />
              </q-item-section>
              <q-item-section>
                Desafio
              </q-item-section>
            </q-item>
            <q-item v-if="currentUser" clickable v-ripple @click="onPerfil()">
              <q-item-section avatar>
                <q-avatar size="30px" color="black" text-color="white" >
                  <div v-if="user && user.photoURL">
                    <q-img width="30px" :ratio="1" :src="user.photoURL" alt="Foto da persona" >
                    </q-img>
                  </div>
                  <div v-if="!user || !user.photoURL">
                    <q-icon name="account_circle" size="30px" />
                  </div>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                Perfil
              </q-item-section>
            </q-item>
            <q-item v-if="!currentUser" clickable v-ripple @click="login()">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>
                login
              </q-item-section>
            </q-item>
            <q-item clickable v-if="!verificaMembers" v-ripple @click="onParticipar()">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                Quero participar
              </q-item-section>
            </q-item>
            <q-item v-if="currentUser" clickable v-ripple @click="logout()" >
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>
                Sair
              </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
    <Login></Login>
    <q-page-container class="row justify-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Dialog } from 'quasar';
import Vuex from "vuex";
import Login from "../pages/auth/login.vue"

export default {
  name: "AppLayout",
  preFetch({ store, currentRoute }) {
    console.log('currentRoute', currentRoute.params.nickname)
    store.dispatch("addSelectProject", currentRoute.params.nickname)
  },
  data() {
    return {
      drawer: false,
      miniState: true
    };
  },
  components: {
    Login
  },
  watch: {
    currentUser(val) {
      if (val) {
        this.$store.dispatch('loadUser')
      }
    },
  },
  computed: {
    ...Vuex.mapState([
      'selectProject',
      'currentUser',
      "user"
    ]),
    ...Vuex.mapGetters({
      verificaMembers: "verificaMembers"
    }),
    contextoPerfil() {
      var name = this.$route.name;
      if (name === "cadastro-perfil" || name === "painel") {
        return true;
      }
      return false;
    },
    mobile() {
      var mobile = this.$q.platform.is.mobile;
       if (mobile) {
         this.miniState = false
         return true
       } else {
         return false
       }
    }
  },
  methods: {
    onPerfil() {
      this.$router.push({ name: 'cadastro-perfil' }).catch((err) => {
        console.log(err)
      })
    },
    onDrawer() {
      this.drawer = !this.drawer
    },
    onParticipar() {
      var currentUser = this.currentUser
      var user = this.user
      this.onDrawer()
      if (user) {
        this.onAddMember()
      } else if(!currentUser) {
        this.login()
      }
    },
    onDashboard() {
      this.$router.push({ name: 'inicio' }).catch((err) => {
        console.log(err)
      })
    },
    onDesafio() {
      this.$router.push({ name: 'painel' }).catch((err) => {
        console.log(err)
      })
    },
    onAddMember() {
      this.$store.dispatch('addGamersProjeto').then(result => {
        Loading.hide()
        if (result.data.status === 200) {
            Dialog.create({
              title: "Parabéns!!!",
              message:
                "Agora você faz parte da nossa JORNADA",
              ok: {
                label: "OK",
                unelevated: true
              },
              position: "top",
              color: "positive"
            }).onOk(()=> {
              location.reload()
            }).onDismiss(()=> {
              location.reload()
            })
        }

      }).catch(err => {
        Loading.hide()

        Dialog.create({
          title: "Ops!!!",
          message:
            "Algo deu errado",
          ok: {
            label: "OK",
            unelevated: true
          },
          position: "top",
          color: "positive"
        })

      })
    },
    logout() {
        Dialog.create({
          title: "Deslogar",
          message:
            "tem certeza que deseja sair?",
          ok: {
            label: "Sim",
            unelevated: true
          },
          position: "top",
          color: "positive"
        }).onOk(() => {
          this.$store.dispatch("logout")
          this.home()

        })
    },
    home() {
      this.$router.push("/").catch((err) => {
        console.log(err)
      })
    },
    login() {
      this.$store.commit('setDialogLogin', true)
    },
    inicio() {
      var nickname = this.selectProject.data.nickname
      this.$router.push({name: 'inicio', params: { nickname: nickname } }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style>
 .layout-app .avatar{
   width: 40px;
   height: 40px
  }
</style>
