<template>
  <q-layout class="layout-app">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title class="text-grey-10 text-weight-bolder">
          {{msg}}
        </q-toolbar-title>
        <template v-if="cards.length !== 0">
          <div>
            <q-btn round flat icon="bookmark" :color="bgcolor">
            <q-menu >
              <q-list style="width: 150px;" class="no-wrap">
                <q-item clickable :to="{ name: 'projects' }">
                  <q-item-section>
                      Dashboard
                  </q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'painel' }">
                  <q-item-section>
                      Desafio
                  </q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'loja' }">
                  <q-item-section>
                      Loja
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-btn color="red" flat label="Sair" @click="logout()" />
                </q-item>
              </q-list>
            </q-menu>
            </q-btn>
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
    msg() {
      let grupo = ''
      let cards = this.cards
      if (cards.cla === "fe") {
        grupo = "Guardiões"
      } else if (cards.cla === "amor") {
        grupo = "Herdeiros"
      } else if (cards.cla === "esperanca" ) {
        grupo = "Gladiadores"
      }
      return grupo        
    },
    bgcolor() {
      let color = "fe" 
      let cards = this.cards
      if (cards.cla === "fe") {
        color = "amber" 
      } else if (cards.cla === "amor") {
        color = "red-8"
      } else if (cards.cla === "esperanca" ) {
        color = "green-6"
      } else {
        color = "fe"
      }
      return color
    },
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
