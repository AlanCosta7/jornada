<template>
  <q-page class="flex flex-center bg-amber"> 
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        class="bg-amber text-white"
      >
        <q-carousel-slide :name="slide" class="column no-wrap flex flex-center">
           <q-circular-progress
                show-value
                class="q-ma-md flex flex-center"
                :value="cards[slide]"
                size="200px"
                :thickness="0.25"
                color="primary"
                track-color="grey-3"
                center-color="grey-3"
                >
                <q-avatar size="100px">
                    <img :src="jornada[slide].icone" alt="">
                </q-avatar>
            </q-circular-progress>

            <q-carousel-control
            position="bottom-right"
            :offset="[18, 5]"
            class="q-gutter-xs"
            >
            <q-btn
                push round dense color="orange" text-color="black" icon="arrow_left"
                @click="previous()"
            />
            <q-btn
                push round dense color="orange" text-color="black" icon="arrow_right"
                @click="next()"
            />
            </q-carousel-control>
            <div class="q-ma-md text-center">
                <p class="text-weight-bolder text-h6">{{jornada[slide].titulo}}</p>
                <p class="text-weight-bold">Mês: {{jornada[slide].mes}} | Desempenho: {{cards[slide]}}</p> 
                <p>Desafio: {{jornada[slide].desafio}}</p> 
            </div>
        </q-carousel-slide>
      </q-carousel>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'PageCla',
  data () {
    return {
      slide: 0
    }
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      cards: "cards",
      jornada: "jornada"
    }),
  },
  mounted() {
    this.$store.dispatch('userCadastrado')
  },
  methods: {
      previous() {
        let slide = this.slide
        if (slide > 0) {
          this.slide = this.slide -1
        }
      },
      next() {
        let slide = this.slide
        if (slide < 9) {
          this.slide = this.slide +1
        }
      }
  }
}
</script>

<style scoped>

  .avatar {
    width: 80px;
    height: 80px;
  }
</style>