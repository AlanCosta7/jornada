<template>
  <q-page class="q-pa-none q-ma-none fit flex flex-center">
    <q-carousel
      v-if="myDesafio.length !== 0"
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      swipeable
      ref="carousel"
      infinite
      control-color="black"
      style="width: 100vw; height:84vh; max-width: 600px"
      class="text-black"
    >
      <q-carousel-slide
        v-for="(item, index) in myDesafio"
        :key="index"
        :name="index"
        class="column no-wrap full-width row justify-start"
      >
        <q-img
          :src="item.data.capa"
          class="row justify-center"
          width="90vw"
          height="100px"
          style="max-width: 600px"
          spinner-color="primary"
          spinner-size="82px"
        >
          <template v-slot:error>
            <div
              class="absolute-full flex flex-center bg-black text-white"
            ></div>
          </template>
        </q-img>

        <div class="q-ma-md full-width">
          <div class="q-mb-md">
            <div class="text-weight-bolder text-h6">{{ item.data.titulo }}</div>
            <div class="text-weight-bold">{{ item.data.descricao }}</div>
          </div>
          <div class="text-bold">Habilidades:</div>
          <div class="q-gutter-sm text-caption">
            <div>
              <div>Criatividade</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.data.habilidades.criatividade) / 10"
              />
            </div>
            <div>
              <div>Trabalho em equipe</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.data.habilidades.trabalhoEmEquipe) / 10"
              />
            </div>
            <div>
              <div>Inteligência emocional</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.data.habilidades.inteligenciaEmocional) / 10"
              />
            </div>
            <div>
              <div>Liderança</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.data.habilidades.lideranca) / 10"
              />
            </div>
            <div>
              <div>Tomada de decisão</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.data.habilidades.tomadaDeDecisao) / 10"
              />
            </div>
          </div>
        </div>

        <div v-if="currentUser" class="container">Meu Desempenho: {{ getPontos(item) }}pt</div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 48]"
          class="q-gutter-xs"
        >
            <q-btn
              push
              round
              dense
              color="amber"
              text-color="black"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="amber"
              text-color="black"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
        </q-carousel-control>
      </template>
    </q-carousel>

    <div v-if="myDesafio.length == 0" class="row flex fit justify-center q-pa-md">
      <div class="col-12 flex flex-center">
        <q-img
          src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Castle_2913096.svg?alt=media&token=7665f89f-c855-408a-9cc1-e25ab48b88eb"
          :ratio="1"
          width="70vw"
          style="max-width: 300px"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
      <div class="col-12">
        <h5 class="text-center">
          Ainda não há desafios disponíveis. Aguarde novidades!
        </h5>
      </div>
      <div class="col-12 flex flex-center">
        <q-btn
          color="black"
          outline
          icon="chevron_left"
          label="voltar"
          @click="onVoltar"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "PageCla",
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    ...Vuex.mapState(["currentUser", "selectProject", "myDesafio", "pontos"]),
  },
  methods: {
    getPontos(item) {
      let pontos = this.pontos
      let result = 0
      let count = 0
      pontos.forEach(element => {

        if (item.id === element.data.uid) {
          count++
          result = parseInt(result) + parseInt(element.data.pontos)
        }
      });
      var media = result/count || 0
      return media
    },
    onVoltar() {
      this.$router.push({ name: "inicio" });
    },
    previous() {
      this.slide = this.slide - 1;

      console.log(this.slide);
    },
    next() {
      // this.slide++
      if (this.slide == this.myDesafio.length - 1) {
        return null;
      } else {
        this.slide = this.slide + 1;
      }
      console.log(this.slide, this.myDesafio.length);
    },
  },
};
</script>

<style lang="stylus">
.avatar {
  width: 100px;
  height: 100px;
}
</style>
