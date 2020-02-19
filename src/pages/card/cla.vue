<template>
  <q-page :class="`bg-${bgcolor}`">
    <div class="row items-center q-pa-sm">
      <q-icon class="col-auto q-ma-xs" name="monetization_on" color="white" />
      <p class="col q-my-xs text-caption text-white">J${{(cards.desempenho*0.07).toFixed(2)-(cards.saida)}}</p>
      <div class="col"></div>
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
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      height="540px"
      control-color="white"
      class="text-white"
      :class="`bg-${bgcolor}`"
    >
      <q-carousel-slide :name="slide" class="column no-wrap flex flex-center">
        <q-circular-progress
          show-value
          class="q-ma-md"
          :value="desempenho"
          size="220px"
          :thickness="0.25"
          color="primary text-center"
          track-color="grey-3"
          center-color="grey-3"
        >
          <q-avatar size="120px">
            <img :src="jornada[slide].icone" v-if="block[slide]" alt />
            <img src="../../assets/icons/cadeado.svg" v-if="!block[slide]" alt />
          </q-avatar>
        </q-circular-progress>

        <q-carousel-control position="bottom-right" :offset="[18, 5]" class="q-gutter-xs">
          <q-btn
            push
            round
            dense
            color="amber"
            text-color="black"
            icon="arrow_left"
            @click="previous()"
          />
          <q-btn
            push
            round
            dense
            color="amber"
            text-color="black"
            icon="arrow_right"
            @click="next()"
          />
        </q-carousel-control>
        <div class="q-ma-md" v-if="block[slide]">
          <p class="text-weight-bolder text-h6">{{jornada[slide].titulo}}</p>
          <p class="text-weight-bold">Mês: {{jornada[slide].mes}} | Desempenho: {{desempenho}}</p>
          <div>Nota Pessoal: {{cards[slide]}}</div>
          <div>Nota Cla: {{cla[slide]}}</div>
          <p>Desafio: {{jornada[slide].desafio}}</p>
        </div>
        <div class="q-ma-md" v-if="!block[slide]">
          <p class="text-weight-bolder text-h6">Fase bloqueada</p>
          <p>Mês: {{jornada[slide].mes}} | Desempenho: 0</p>
          <p>Desafio: O desafio será revelado pelo líder do clã. Aguarde a liberação dessa fase.</p>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { Loading, QSpinnerOval } from 'quasar'

export default {
  name: "PageCla",
  data() {
    return {
      slide: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      cards: "cards",
      mediaCla: "mediaCla",
      cla: "cla",
      jornada: "jornada",
      block: "block"
    }),
    desempenho() {
      var cards = this.cards;
      var cla = this.cla;
      var slide = this.slide;
      var result = (cards[slide] + cla[slide]) / 2;
      return result;
    },
    bgcolor() {
      let color = "red-8";
      let block = this.block[this.slide];
      if (block) {
        color = "positive";
      } else {
        color = "red-8";
      }
      return color;
    }
  },
  methods: {
    async atualizar() {
      await this.$store.dispatch('blockJornada')
      await this.$store.dispatch('mediaCla')
      await this.$store.dispatch('addLoja')
      await this.$store.dispatch('userCadastrado')
    },
    previous() {
      let slide = this.slide;
      if (slide > 0) {
        this.slide = this.slide - 1;
      }
    },
    next() {
      let slide = this.slide;
      if (slide < 9) {
        this.slide = this.slide + 1;
      }
    }
  }
};
</script>

<style lang="stylus">
.avatar {
  width: 100px;
  height: 100px;
}
</style>