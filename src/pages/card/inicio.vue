<template>
  <q-page id="page-inicio" :class="cla = cards.cla ? cards.cla : 'bg-blue-grey'">
    <div class="q-pa-sm">
      <div class="column flex flex-center">
        <div v-if="cards.length !== 0">
            <div class="row items-center">
                <q-icon class="q-ma-xs" name="monetization_on" color="white" /><p class="col q-my-xs text-caption text-white">J${{(jcoins-cards.saida).toFixed(2)}}</p>
                <q-icon class="q-ma-xs" name="bookmark" color="white" /><p class="col q-my-xs text-caption text-white">{{msg}}</p>

                <q-btn icon="refresh" size="sm" class="absolute-top-right q-ma-sm" push flat @click="atualizar" color="white"></q-btn>
            </div>
            <div class="column flex flex-center q-pa-sm">
                <div v-if="user.photoURL">
                    <img class="avatar" :src="user.photoURL" alt="foto perfil">
                </div>
            </div>
            <div class="row">
                <div class="col-6 column">
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[0].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="coordenacao" color="primary" class="col-7 q-mt-xs" />
                        <p class="textcap text-white">Coordenação/{{(coordenacao*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[2].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="criatividade" color="primary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Criatividade/{{(criatividade*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[4].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="pensamento" color="primary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Pensamento Crítico/{{(pensamento*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[6].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="servir" color="primary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Serviço/{{(servir*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[8].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="problema" color="primary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Problemas Complexos/{{(problema*100).toFixed(2)}}%</p>
                    </div>
                </div>
                <div class="col-6 column">
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[1].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="aprendizado" color="primary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Aprendizado/{{(aprendizado*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[3].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="negociacao" color="primary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Negociação/{{(negociacao*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[5].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="gestao" color="primary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Gestão de Pessoas/{{(gestao*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[7].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="emocao" color="primary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Inteligência Emocional/{{(emocao*100).toFixed(2)}}%</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[9].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="decisao" color="primary" class="col-7 q-mx-xs" />
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
      icones: "jornada"
    }),
    msg() {
      let msg = "Fé" 
      let cards = this.cards
      if (cards.cla === "fe") {
        msg ='Fé' 
      } else if (cards.cla === "amor") {
        msg ='Amor' 
      } else if (cards.cla === "esperanca" ) {
        msg ='Esperança' 
      } else {
        msg = "Fé" 
      }
      return msg    
    },
    color() {
      let color = "fe" 
      let cards = this.cards
      if (cards.cla === "fe") {
        color = "amber" 
        this.msg ='Fé' 
      } else if (cards.cla === "amor") {
        color = "red-8"
        this.msg ='Amor' 
      } else if (cards.cla === "esperanca" ) {
        color = "green-6" 
        this.msg ='Esperança' 
      } else {
        color = "fe"
      }
      return color
    },
    coordenacao() {
        let a = this.cards[0] * 1
        let b = this.cards[1] * 0.5
        let c = this.cards[2] * 0.5
        let d = this.cards[3] * 0.8
        let e = this.cards[4] * 0.4
        let f = this.cards[5] * 0.9
        let g = this.cards[6] * 0.9
        let h = this.cards[7] * 0.7
        let i = this.cards[8] * 0.5
        let j = this.cards[9] * 0.8
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    aprendizado() {
        let a = this.cards[0] * 0.5
        let b = this.cards[1] * 1
        let c = this.cards[2] * 0.9
        let d = this.cards[3] * 0.5
        let e = this.cards[4] * 0.6
        let f = this.cards[5] * 0.5
        let g = this.cards[6] * 0.5
        let h = this.cards[7] * 0.9
        let i = this.cards[8] * 0.9
        let j = this.cards[9] * 0.7
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    criatividade() {
        let a = this.cards[0] * 0.5
        let b = this.cards[1] * 0.9
        let c = this.cards[2] * 1
        let d = this.cards[3] * 0.4
        let e = this.cards[4] * 0.7
        let f = this.cards[5] * 0.6
        let g = this.cards[6] * 0.8
        let h = this.cards[7] * 0.6
        let i = this.cards[8] * 0.9
        let j = this.cards[9] * 0.6
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    negociacao() {
        let a = this.cards[0] * 0.8
        let b = this.cards[1] * 0.5
        let c = this.cards[2] * 0.4
        let d = this.cards[3] * 1
        let e = this.cards[4] * 0.9
        let f = this.cards[5] * 0.7
        let g = this.cards[6] * 0.6
        let h = this.cards[7] * 0.6
        let i = this.cards[8] * 0.7
        let j = this.cards[9] * 0.8
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    pensamento() {
        let a = this.cards[0] * 0.4
        let b = this.cards[1] * 0.6
        let c = this.cards[2] * 0.7
        let d = this.cards[3] * 0.9
        let e = this.cards[4] * 1
        let f = this.cards[5] * 0.7
        let g = this.cards[6] * 0.7
        let h = this.cards[7] * 0.9
        let i = this.cards[8] * 0.5
        let j = this.cards[9] * 0.6
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    gestao() {
        let a = this.cards[0] * 0.9
        let b = this.cards[1] * 0.5
        let c = this.cards[2] * 0.6
        let d = this.cards[3] * 0.7
        let e = this.cards[4] * 0.7
        let f = this.cards[5] * 1
        let g = this.cards[6] * 0.8
        let h = this.cards[7] * 0.6
        let i = this.cards[8] * 0.5
        let j = this.cards[9] * 0.7
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    servir() {
        let a = this.cards[0] * 0.9
        let b = this.cards[1] * 0.5
        let c = this.cards[2] * 0.8
        let d = this.cards[3] * 0.6
        let e = this.cards[4] * 0.7
        let f = this.cards[5] * 0.8
        let g = this.cards[6] * 1
        let h = this.cards[7] * 0.5
        let i = this.cards[8] * 0.6
        let j = this.cards[9] * 0.6
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    emocao() {
        let a = this.cards[0] * 0.7
        let b = this.cards[1] * 0.9
        let c = this.cards[2] * 0.6
        let d = this.cards[3] * 0.6
        let e = this.cards[4] * 0.9
        let f = this.cards[5] * 0.6
        let g = this.cards[6] * 0.5
        let h = this.cards[7] * 1
        let i = this.cards[8] * 0.6
        let j = this.cards[9] * 0.6
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    problema() {
        let a = this.cards[0] * 0.5
        let b = this.cards[1] * 0.9
        let c = this.cards[2] * 0.9
        let d = this.cards[3] * 0.7
        let e = this.cards[4] * 0.5
        let f = this.cards[5] * 0.5
        let g = this.cards[6] * 0.6
        let h = this.cards[7] * 0.6
        let i = this.cards[8] * 1
        let j = this.cards[9] * 0.8
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    decisao() {
        let a = this.cards[0] * 0.8
        let b = this.cards[1] * 0.7
        let c = this.cards[2] * 0.6
        let d = this.cards[3] * 0.8
        let e = this.cards[4] * 0.6
        let f = this.cards[5] * 0.7
        let g = this.cards[6] * 0.6
        let h = this.cards[7] * 0.6
        let i = this.cards[8] * 0.8
        let j = this.cards[9] * 0.8
        
        let ptn = (a+b+c+d+e+f+g+h+i+j)/70
        
        return ptn/10
    },
    jcoins() {
        let jcoins = this.coordenacao + this.aprendizado + this.criatividade + this.negociacao + this.pensamento + this.gestao + this.servir + this.emocao + this.problema + this.decisao
        return jcoins * 7
    }
  },
  mounted() {
        this.$store.dispatch('userCadastrado')
  },
  methods: {
    iniciar() {
        const user = this.user
        this.$store.dispatch('createOrUpdateOnFirestore', user)
        this.$store.dispatch('userCadastrado')
    },
    async atualizar() {
        await this.$store.dispatch('userCadastrado') 
        let jcoins = {jcoins: this.jcoins}
        await this.$store.dispatch('updateJcoins', jcoins) 
    }
  },
};
</script>

<style>
#page-inicio
  .avatar {
    width: 80px;
    height: 80px;
  }
  .textcap {
    font-size: 0.7em
  }
</style>