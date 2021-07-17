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
          :src="item.capa"
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
            <div class="text-weight-bolder text-h6">{{ item.titulo }}</div>
            <div class="text-weight-bold">{{ item.descricao }}</div>
          </div>
          <div class="text-bold">Habilidades:</div>
          <div class="q-gutter-sm text-caption">
            <div>
              <div>Criatividade</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.habilidades.criatividade) / 10"
              />
            </div>
            <div>
              <div>Trabalho em equipe</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.habilidades.trabalhoEmEquipe) / 10"
              />
            </div>
            <div>
              <div>Inteligência emocional</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.habilidades.inteligenciaEmocional) / 10"
              />
            </div>
            <div>
              <div>Liderança</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.habilidades.lideranca) / 10"
              />
            </div>
            <div>
              <div>Tomada de decisão</div>
              <q-linear-progress
                size="10px"
                :value="parseInt(item.habilidades.tomadaDeDecisao) / 10"
              />
            </div>
          </div>
        </div>

        <div v-if="currentUser" class="container">Meu Desempenho: {{ getPontos() }}pt</div>
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

    <div v-if="myDesafio.length == 0" class="row justify-center q-pa-md">
      <q-img
        src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Castle_2913096.svg?alt=media&token=7665f89f-c855-408a-9cc1-e25ab48b88eb"
        :ratio="1"
        width="70vw"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div>
        <h5 class="text-center">
          Ainda não há desafios disponíveis. Aguarde novidades!
        </h5>
      </div>
      <q-btn
        color="black"
        outline
        icon="chevron_left"
        label="voltar"
        @click="onVoltar"
      />
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
    getPontos() {
      var uid = this.currentUser.uid;
      let pontos = this.pontos;
      var req = pontos.find(function getId(member) {
        const result = member.uid === uid;
        if (result) {
          return member.pontos;
        } else return 0;
      });
      if (req) {
        return req.pontos;
      }
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
