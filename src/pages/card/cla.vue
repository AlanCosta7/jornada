<template>
  <q-page class="flex flex-center" :class="cla = cards.cla ? cards.cla : cla"> 
    <div class="q-pa-sm">
            <div class="row items-center">
                <q-btn icon="refresh" size="sm" class="absolute-top-right q-ma-sm" push flat @click="atualizar" color="white"></q-btn>
            </div>
        </div>
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        height="450px"
        control-color="white"
        class="text-white"
        :class="cla = cards.cla ? cards.cla : cla"
      >
        <q-carousel-slide :name="slide" class="column no-wrap flex flex-center" >
           <q-circular-progress
                show-value
                class="q-ma-md flex flex-center"
                :value="cards[slide]"
                size="220px"
                :thickness="0.25"
                color="primary"
                track-color="grey-3"
                center-color="grey-3"
                >
                <q-avatar size="120px">
                    <img :src="jornada[slide].icone" v-if="block[slide]" alt="">
                    <img src="../../assets/icons/cadeado.svg" v-if="!block[slide]" alt="">
                </q-avatar>
            </q-circular-progress>

            <q-carousel-control
            position="bottom-right"
            :offset="[18, 5]"
            class="q-gutter-xs"
            >
            <q-btn
                push round dense color="amber" text-color="black" icon="arrow_left"
                @click="previous()"
            />
            <q-btn
                push round dense color="amber" text-color="black" icon="arrow_right"
                @click="next()"
            />
            </q-carousel-control>
            <div class="q-ma-md text-center"  v-if="block[slide]" >
                <p class="text-weight-bolder text-h6">{{jornada[slide].titulo}}</p>
                <p class="text-weight-bold">Mês: {{jornada[slide].mes}} | Desempenho: {{cards[slide]}}</p> 
                <p>Desafio: {{jornada[slide].desafio}}</p> 
            </div>
            <div class="q-ma-md text-center"  v-if="!block[slide]" >
                <p class="text-weight-bolder text-h6">Fase bloqueada</p>
                <p class="text-weight-bold">Mês: {{jornada[slide].mes}} | Desempenho: 0</p> 
                <p>Desafio: O desafio será revelado pelo líder do clã. Aguarde a liberação dessa fase.</p> 
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
      slide: 0,
      cla: "esperanca"
    }
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      cards: "cards",
      jornada: "jornada",
      block: "block"
    })
  },
  mounted() {    
    this.$store.dispatch('blockJornada')
    this.$store.dispatch('userCadastrado')
  },
  methods: {
    async atualizar() {
      this.$store.dispatch('blockJornada')
    },
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

<style lang="stylus">
  .avatar {
    width: 100px;
    height: 100px;
  }
</style>