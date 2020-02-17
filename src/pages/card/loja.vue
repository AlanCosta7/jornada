<template>
  <q-page class="column">
    <q-resize-observer @resize="onResize" />
    <div class="row absolute-top z-top items-center">
      <q-icon class="col-auto q-ma-xs" name="monetization_on" color="white" />
      <p class="col q-my-xs text-caption text-white">J${{(jcoins-cards.saida).toFixed(2)}}</p>

    </div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      :height="report"
      control-color="white"
      class="text-white fit-height"
    >
      <q-carousel-slide :name="slide" :img-src="loja[slide].img" class="column no-wrap"> 
        <q-carousel-control position="bottom-right" :offset="[18, 5]" class="q-gutter-xs btn-control">
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

        <div class="q-ma-md text-center action-btn custom-caption">
          <p class="text-weight-bolder text-white text-h2">{{loja[slide].titulo}}</p>
          <q-btn color="positive" @click="comprar(loja[slide].valor)">comprar: J${{loja[slide].valor}}</q-btn>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog v-model="dialog" position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">Saldo insuficiente</div>
            <div class="text-grey">Continue participando dos desafios e ajudando seu clã para conquistar mais jcoins</div>
          </div>

          <q-space />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageLoja",
  data() {
    return {
      slide: 0,
      report: "",
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      loja: "loja",
      cards: "cards",
      jcoins: "jcoins"
    }),
  },
  async mounted() {
    this.onResize()
    await this.$store.dispatch('addLoja')
  },
  methods: {
    onResize (size) {
      this.report = size.height + 'px'
      // {
      //   width: 20 // width of container (in px)
      //   height: 50 // height of container (in px)
      // }
    },
    comprar(item) {
      this.dialog = true
      console.log(item)
    },
    previous() {
      let slide = this.slide;
      if (slide > 0) {
        this.slide = this.slide - 1;
      }
    },
    next() {
      let slide = this.slide;
      if (slide < 2) {
        this.slide = this.slide + 1;
      }
    }
  }
};
</script>

<style scoped>
.action-btn {
  position: absolute;
  bottom: 0px;
  left: 0;
  margin: 0px;
}

.btn-control {
  z-index: 100;
}

.custom-caption {
  width: 100%;
  height: 200px;
  text-align: center;
  padding: 12px;
  color: white;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>