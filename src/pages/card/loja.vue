<template>
  <q-page class="column bg-black" >
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
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      height="300px"
      control-color="white"
      class="text-white "
    >
      <q-carousel-slide :name="slide" v-if="loja" :img-src="loja[slide].img" class="column no-wrap"> 
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
      </q-carousel-slide>
    </q-carousel>

        <div class="q-pa-lg text-center action-btn custom-caption">
          <p class="text-weight-bolder text-blue-grey-4 text-h2">{{loja[slide].titulo}}</p>
          <q-btn color="positive" @click="comprar(loja[slide].valor)">comprar: J${{loja[slide].valor}}</q-btn>
        </div>

        <!-- Saldo insuficiente -->
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

        <!-- Compra -->
    <q-dialog v-model="comprarItemDialog" position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">Tem certeza que deseja comprar esse item?</div>
          </div>
          <q-space />
          <q-btn flat round color="positive" @click="comprarItem" icon="done" />
          <q-btn flat round color="negative" icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { Loading, QSpinnerOval } from 'quasar'

export default {
  name: "PageLoja",
  data() {
    return {
      slide: 0,
      dialog: false,
      comprarItemDialog: false,
      item: ''
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      loja: "loja",
      cards: "cards"
    }),
  },
  async mounted() {
    Loading.show({spinner: QSpinnerOval, message: 'Atualizando...' })
    this.atualizar()
    Loading.hide()
  },
  methods: {
    async atualizar() {
        await this.$store.dispatch('userCadastrado') 
        await this.$store.dispatch('blockJornada')
        await this.$store.dispatch('mediaCla')
        await this.$store.dispatch('addLoja')
    },
    async comprar(item) {
      let cards = this.cards
      if (item > cards.jcoins) {
        this.dialog = true
      } else {
        var result = cards.jcoins - item
        var jcoins = {jcoins: result}
        this.item = jcoins
        this.comprarItemDialog = true
      }
    },
    async comprarItem () {
      var item = this.item
      var user = this.currentUser
      var loja = this.loja
      var slide = this.slide

      let itemComprado = {
        user: user,
        item: loja[slide]
      }
      await this.$store.dispatch('updateJcoins', item)
      await this.$store.dispatch('setComprar', itemComprado)

      this.atualizar()
        this.comprarItemDialog = false
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
  position: relative;
  left: 0;
}

.btn-control {
  z-index: 100;
}

.custom-caption {
  width: 100%;
  height: 200px;
  text-align: center;
  color: white;
  z-index: 0;
}
</style>