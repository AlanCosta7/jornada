<template>
  <q-layout class="layout-app">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title class="text-grey-10 text-weight-bolder">
          Jornada
        </q-toolbar-title>
        <template v-if="cards.length !== 0">
          <div>
            <q-btn round icon="bookmark" :color="color">
            </q-btn>
            <q-menu style="width: 150px;">
              <q-list class="no-wrap">
                <q-item :to="{ name: 'projects' }" exact>
                  <q-item-section>
                    <q-item-label label>
                      Dashboard
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item :to="{ name: 'painel' }" exact>
                  <q-item-section>
                    <q-item-label label>
                      Desafio
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item link>
                  <q-btn color="red" flat label="Sair" @click="logout()" />
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </template>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
      
      <q-dialog v-model="inception">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Sair
            </div>
          </q-card-section>

          <q-card-section>
            Tem certeza de deseja sair?
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Sim" @click="sair" />
            <q-btn v-close-popup flat label="Cancelar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "MyLayout",
  data() {
    return {
      inception: false,
    };
  },
  computed: {
    ...Vuex.mapGetters({
      currentUser: "currentUser",
      cards: "cards",
      jornada: "jornada"
    }),
    color() {
      let color = "orange" 
      let cards = this.cards
      if (cards.cla === "fe") {
        color = "orange" 
        this.msg ='Fé' 
      } else if (cards.cla === "amor") {
        color = "red-8"
        this.msg ='Amor' 
      } else if (cards.cla === "esperanca" ) {
        color = "green-6" 
        this.msg ='Esperança' 
      } else {
        color = "orange"
      }
      return color
    },
  },
  mounted() {
    this.$store.dispatch('userCadastrado')
  },
  methods: {
    sair() {
      this.$store.dispatch("logout")
      this.$router.push("/")
    },
    logout() {
      this.inception = true
    },
    inicio() {
      this.$router.push("/app/inicio")
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
