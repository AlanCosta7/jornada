<template>
  <q-page class="column">
    <div class="row items-center q-pa-sm">
      <q-icon class="col-auto q-ma-xs" name="monetization_on" color="white" />
      <p class="col q-my-xs text-caption text-white">J${{cards.jcoins}}</p>
      <q-btn
        icon="refresh"
        size="sm"
        class="absolute-top-right q-ma-sm"
        push
        flat
        @click="atualizar"
        color="white"
      ></q-btn>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered class="rounded-borders" style="max-width: 320px">
        <div class="row">
            <q-item-label class="col" header>Ranking</q-item-label>
            <q-item-label class="col-auto" header>Desempenho</q-item-label>
        </div>
        <q-item class="row items-center" v-ripple v-for="rank in usuarios" :key="rank.index">
          <q-item-section class="col-1" >
              <div class="text-weight-bold text-h6">{{usuarios.indexOf(rank)+1}}</div>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <img :src="rank.photoUrl" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="col q-mx-sm">
            <q-item-label lines="1">{{rank.name}}</q-item-label>
          </q-item-section>
<!-- 
            <q-btn label="Salvar" color="positive" @click="salvarUsuarios(rank)"></q-btn>
            <q-btn label="Remover" color="negative" @click="removeUsuario(rank)"></q-btn>

          <q-item-section
            side
            top
          >Fev: {{rank[0]}}</q-item-section>
          <q-item-section
            side
            top
          >Mar: {{rank[1]}}</q-item-section>
          <q-item-section
            side
            top
          >Abr: {{rank[2]}}</q-item-section>
          <q-item-section
            side
            top
          >Mai: {{rank[3]}}</q-item-section>
          <q-item-section
            side
            top
          >Jun: {{rank[4]}}</q-item-section>
          <q-item-section
            side
            top
          >Jul: {{rank[5]}}</q-item-section>
          <q-item-section
            side
            top
          >Ago: {{rank[6]}}</q-item-section>
          <q-item-section
            side
            top
          >Set: {{rank[7]}}</q-item-section>
          <q-item-section
            side
            top
          >Out: {{rank[8]}}</q-item-section>
          <q-item-section
            side
            top
          >Nov: {{rank[9]}}</q-item-section> -->
          <q-item-section class="col-2"
            side
            top
          >{{rank.desempenho}}
            <!-- <q-popup-edit v-model="rank.desempenho" title="Editar desempenho">
              <q-input v-model="item.desempenho" dense autofocus counter />
            </q-popup-edit> -->
        </q-item-section>
        </q-item>
      </q-list>
    </div>


  </q-page>
</template>


<script>
import { mapGetters } from "vuex";
import { Loading, QSpinnerOval } from "quasar";

export default {
  name: "PageLoja",
  data() {
    return {
        item: {}
    };
  },
  async mounted() {
    Loading.show({ spinner: QSpinnerOval, message: "Atualizando..." });
    this.atualizar();
    Loading.hide();
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      cards: "cards",
      cla: "cla",
      usuarios: "usuarios"
    })
  },
  methods: {
    async atualizar() {
      await this.$store.dispatch("userCadastrado");
      await this.$store.dispatch("mediaCla");
      await this.$store.dispatch("updateUser");
    },
    async removeUsuario(rank){
      var uid = rank.id
      await this.$store.dispatch("removeUsuario", uid);
    },
    async salvarUsuarios(rank) {
        var item = {
            desempenho: Number(this.item.desempenho),
            uid: rank.id
        }

      await this.$store.dispatch("updateUsuario", item);
    },
    atualizarNotas() {
      this.dialogAtualizarNotas = true;
    }
  }
};
</script>