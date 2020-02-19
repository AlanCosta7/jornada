<template>
  <q-page id="page-inicio" :class="`bg-${bgcolor}`">
    <div class="q-pa-sm">
      <div class="column flex flex-center">
        <div v-if="cards.length !== 0">
            <div class="row items-center">
                <q-icon class="col-auto q-ma-xs" name="monetization_on" color="white" /><p class="col q-my-xs text-caption text-white">J${{(cards.desempenho*0.07).toFixed(2)-cards.saida}}</p>
                <q-btn icon="refresh" size="sm" class="absolute-top-right q-ma-sm" push flat @click="atualizar" color="white"></q-btn>
            </div>
            <div class="column flex flex-center q-pa-md">
                <div v-if="user.photoURL">
                    <img class="avatar" :src="user.photoURL" alt="foto perfil">
                </div>
            </div>
            <div class="row">
                <div class="col-6 column">
                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[0].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="coordenacao" color="primary" class="col q-mt-xs" />
                      </div>
                        <p class="textcap text-white">Coordenação/{{(coordenacao*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[2].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px"  :value="criatividade" color="primary" class="col-7 q-mx-xs" />
                      </div>
                        <p class="textcap text-white">Criatividade/{{(criatividade*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img wwidth="100px" height="100px" class="col-xs-3" :src="icones[4].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px"  :value="pensamento" color="primary" class="col-7 q-mx-xs" />
                      </div>
                        <p class="textcap text-white">Pensamento Crítico/{{(pensamento*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[6].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px"  :value="servir" color="primary" class="col-7 q-mx-xs" />
                      </div>
                        <p class="textcap text-white">Serviço/{{(servir*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[8].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px"  :value="problema" color="primary" class="col-7 q-mx-xs" />
                      </div>
                        <p class="textcap text-white">Problemas Complexos/{{(problema*100).toFixed(2)}}%</p>
                    </div>

                </div>
                <div class="col-6 column">
                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[1].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="aprendizado" color="primary" class="col-7 q-mx-xs" />
                      </div>
                    <p class="textcap text-white">Aprendizado/{{(aprendizado*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[3].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="negociacao" color="primary" class="col-7 q-mx-xs" />
                      </div>
                    <p class="textcap text-white">Negociação/{{(negociacao*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[5].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="gestao" color="primary" class="col-7 q-mx-xs" />
                      </div>
                    <p class="textcap text-white">Gestão de Pessoas/{{(gestao*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[7].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="emocao" color="primary" class="col-7 q-mx-xs" />
                      </div>
                    <p class="textcap text-white">Inteligência Emocional/{{(emocao*100).toFixed(2)}}%</p>
                    </div>

                    <div class="column flex flex-center q-ma-xs">
                      <div class="row items-center ">
                        <img width="100px" height="100px" class="col-xs-3" :src="icones[9].icone" alt=""> 
                        <q-linear-progress rounded style="max-width: 250px; height: 8px" :value="decisao" color="primary" class="col-7 q-mx-xs" />
                      </div>
                    <p class="textcap text-white">Tomada de Decisão/{{(decisao*100).toFixed(2)}}%</p>
                    </div>

                </div>
            </div>
        </div>
            <div v-if="cards.length == 0"> 
                <h6 class="q-mt-xl text-white lulo">
                    Olá {{ user.nome }}!
                </h6>
                <q-btn @click="iniciar" color="positive" label="Vamos começar?"></q-btn>
            </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"
import { Loading, QSpinnerOval } from 'quasar'

export default {
  name: "Iniciopage",
  data() {
    return {
      numero: 1
    };
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      cards: "cards",
      cla: "cla",
      icones: "jornada",
      coordenacao: "coordenacao",
      aprendizado: "aprendizado",
      criatividade: "criatividade",
      negociacao: "negociacao",
      pensamento: "pensamento",
      gestao: "gestao",
      servir: "servir",
      emocao: "emocao",
      problema: "problema",
      decisao: "decisao"
    }),
    bgcolor() {
      let color = "fe" 
      let cards = this.cards
      if (cards.cla === "fe") {
        color = "amber"
      } else if (cards.cla === "amor") {
        color = "red-8"
      } else if (cards.cla === "esperanca" ) {
        color = "green-6"
      } else {
        color = "fe"
      }
      return color
    }
  },
  methods: {
    iniciar() {
        const user = this.user
        this.$store.dispatch('createOrUpdateOnFirestore', user)
        this.$store.dispatch('userCadastrado')
    },
    async atualizar() {
      await this.$store.dispatch('blockJornada')
      await this.$store.dispatch('mediaCla')
      await this.$store.dispatch('addLoja')
      await this.$store.dispatch('userCadastrado')
    }
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