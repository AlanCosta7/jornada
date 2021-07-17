<template>
  <q-layout>
    <div class="text-bold row q-pa-md full-width items-center">
      <div class="text-bold text-h5 q-pb-lg">Projetos</div>
      <q-space />
      <q-input v-model="searchProject" class="col-7" color="black" outlined dense bottom-slots type="text" label="Pesquisar" >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-gutter-sm q-pa-md">
      <q-list v-for="(item, index) in projects" :key="index" >
        <q-card @click="acessarProject(item)" class="row full-width" style="max-width: 450px">
          <q-card-section avatar>
            <q-img width="30px" :ratio="1"  :src="item.data.photoURL" />
          </q-card-section>
          <q-card-section>
            <q-item-section class="text-center text-h6">{{item.data.displayName}}</q-item-section>
          </q-card-section>
        </q-card>
      </q-list>
    </div>
  </q-layout>
</template>

<script>
import Vuex from "vuex"

export default {
  data() {
    return {
      searchProject: null
    }
  },
  computed: {
    ...Vuex.mapState([
      'projects',
    ])
  },
  mounted() {
    if (this.projects.length === 0) {
      this.$store.dispatch('loadProject')
    }
  },
  methods: {
    acessarProject(item) {
      var nickname = item.data.nickname
      this.$router.push({name: 'inicio', params: { nickname: nickname } })
    }
  },
}
</script>

<style>

</style>
