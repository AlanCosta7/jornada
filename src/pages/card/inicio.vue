<template>
  <q-page id="page-inicio" class="bg-blue-grey-1">
    <div class="q-pa-sm row justify-center" style="max-width: 600px">
      <div class="col">
        <div class="row text-h6 col-12 q-ma-md">
          <div class="col-5">
          Membros / {{gamers.length}}
          </div>
          <q-space class="col" />
          <div class="col-6" v-if="!verificaMembers">
            <q-btn color="black" size="sm" label="Quero participar" @click="onParticipar()" />
          </div>
        </div>
        <q-list v-show="gamers.length > 0" bordered v-for="(item, index) in gamers" :key="index">

          <q-expansion-item
            style="width: 90vw; max-width: 600px"
            header-class="bg-white text-black rounded-borders"
            expand-icon-class="text-black"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="item && item.data && item.data.photoURL" :src="item.data.photoURL" />
                  <q-icon v-if="item && item.data && !item.data.photoURL" name="person" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <div class="text-h6 ellipsis" v-if="item && item.data && item.data.displayName">{{ item.data.displayName }}</div>
              </q-item-section>
              <q-card-section>
                <div class="text-h6 col">{{ getPontos(item) }}</div>
              </q-card-section>
            </template>

            <q-card v-if="item">
              <q-card-section>
                  <div class="text-bold">Desempenho: {{ getPontos(item) }} pt</div>
                  <div class="q-gutter-sm">
                    <div>
                      <div>Criatividade</div>
                      <q-linear-progress
                        size="10px"
                        :value="calculadora(item).criatividade"
                      />
                    </div>
                    <div>
                      <div>Trabalho em equipe</div>
                      <q-linear-progress
                        size="10px"
                        :value="calculadora(item).trabalhoEmEquipe"
                      />
                    </div>
                    <div>
                      <div>Inteligência emocional</div>
                      <q-linear-progress
                        size="10px"
                        :value="calculadora(item).inteligenciaEmocional"
                      />
                    </div>
                    <div>
                      <div>Liderança</div>
                      <q-linear-progress
                        size="10px"
                        :value="calculadora(item).lideranca"
                      />
                    </div>
                    <div>
                      <div>Tomada de decisão</div>
                      <q-linear-progress
                        size="10px"
                        :value="calculadora(item).tomadaDeDecisao"
                      />
                    </div>
                  </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-list>
      </div>

    <div v-if="gamers.length == 0" class="row justify-center q-pa-md">
      <q-img
        src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Castle_2913096.svg?alt=media&token=7665f89f-c855-408a-9cc1-e25ab48b88eb"
        :ratio="1"
        width="70vw"
        style="max-width: 300px"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div>
        <h5 class="text-center">
          Seja o primeiro a participar desse projeto!
        </h5>
      </div>
      <q-btn
        color="black"
        icon="add"
        label="Quero participar"
        @click="onParticipar()"
      />
    </div>
    </div>
  </q-page>
</template>

<script>
import { Loading, Dialog } from 'quasar';
import Vuex from "vuex";

export default {
  name: "Iniciopage",
  data() {
    return {
      numero: 1,
      resultadosUser: [],
    };
  },
  watch: {
    currentUser(val) {
      if (val) {
        this.$store.dispatch('loadUser')
      }
    }
  },
  computed: {
     ...Vuex.mapState([
      'myDesafio',
      'currentUser',
      'selectProject',
      'gamers',
      'pontos',
      'user'
     ]),
    ...Vuex.mapGetters({
      verificaMembers: "verificaMembers"
    }),
  },
  methods: {
    onParticipar() {
      Loading.show()
      var currentUser = this.currentUser
      var user = this.user
      if (user) {
        this.onAddMember()
      } else if(!currentUser) {
        this.login()
      }
    },
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
    calculadora(item) {
      let pontos = this.getPontos(item)
      let media = 0
      let myDesafio = this.myDesafio
      if (myDesafio.length === 0) {
        return {
          criatividade: 0,
          inteligenciaEmocional: 0,
          lideranca: 0,
          tomadaDeDecisao: 0,
          trabalhoEmEquipe: 0,
        }
      }

      let calCriatividade = null
      let calInteligenciaEmocional = null
      let calLideranca = null
      let calTomadaDeDecisao = null
      let calTrabalhoEmEquipe = null

      for (let i = 0; i < myDesafio.length; i++) {
        const element = myDesafio[i];
        media = pontos + pontos
        let criatividade = element.data.habilidades.criatividade
        let inteligenciaEmocional = element.data.habilidades.inteligenciaEmocional
        let lideranca = element.data.habilidades.lideranca
        let tomadaDeDecisao = element.data.habilidades.tomadaDeDecisao
        let trabalhoEmEquipe = element.data.habilidades.trabalhoEmEquipe

        let newCriatividade = (pontos * criatividade) /100
        let newInteligenciaEmocional = (pontos * inteligenciaEmocional) /100
        let newLideranca = (pontos * lideranca) /100
        let newTomadaDeDecisao = (pontos * tomadaDeDecisao) /100
        let newTrabalhoEmEquipe = (pontos * trabalhoEmEquipe) /100

        calCriatividade = calCriatividade + newCriatividade
        calInteligenciaEmocional = calCriatividade + newInteligenciaEmocional
        calLideranca = calCriatividade + newLideranca
        calTomadaDeDecisao = calCriatividade + newTomadaDeDecisao
        calTrabalhoEmEquipe = calCriatividade + newTrabalhoEmEquipe

      }

      let result = {
        criatividade: calCriatividade / myDesafio.length,
        inteligenciaEmocional: calInteligenciaEmocional / myDesafio.length,
        lideranca: calLideranca / myDesafio.length,
        tomadaDeDecisao: calTomadaDeDecisao / myDesafio.length,
        trabalhoEmEquipe: calTrabalhoEmEquipe / myDesafio.length,
        media: media
      }
      return result

    },
    onAddMember() {
      this.$store.dispatch('addGamersProjeto').then(result => {
        Loading.hide()
        console.log(result)
        if (result.data.status === 200) {
            Dialog.create({
              title: "Parabéns!!!",
              message:
                "Agora você faz parte da nossa JORNADA",
              ok: {
                label: "OK",
                unelevated: true
              },
              position: "top",
              color: "positive"
            }).onOk(()=> {
              location.reload()
            }).onDismiss(()=> {
              location.reload()
            })
        }

      }).catch(err => {
        Loading.hide()

        Dialog.create({
          title: "Ops!!!",
          message:
            "Algo deu errado",
          ok: {
            label: "OK",
            unelevated: true
          },
          position: "top",
          color: "positive"
        })

      })
    },
  },
};
</script>

<style>
#page-inicio
  .avatar {
    width: 100px;
    height: 100px;
  }
  .textcap {
    font-size: 0.7rem;
  }
</style>
