<template>
  <q-page id="page-inicio" :class="sexo = cards.sexo ? cards.sexo : sexo">
    <div class="q-pa-sm">
      <div class="column flex flex-center">
        <div v-if="cards.length !== 0">
            <div class="row items-center">
                <q-icon class="q-ma-xs" name="monetization_on" color="amber" /><p class="col q-my-xs text-caption text-white">J${{jcoins.toFixed(2)}}</p>
                <q-btn size="xs" class="col-2 q-ma-xs text-black" push label="Atualizar" @click="atualizar" color="amber"></q-btn>
            </div>
            <div class="column flex flex-center q-py-xs">
                <div v-if="user.photoURL">
                    <img class="avatar" :src="user.photoURL" alt="foto perfil">
                </div>
            </div>
            <div class="row">
                <div class="col-6 column">
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[0].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="coordenacao" color="secondary" class="col-7 q-mt-xs" />
                        <p class="textcap text-white">Coordenação</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[2].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="criatividade" color="secondary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Criatividade</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[4].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="pensamento" color="secondary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Pensamento Crítico</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[6].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="servir" color="secondary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Serviço</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[8].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="problema" color="secondary" class="col-7 q-mx-xs" />
                        <p class="textcap text-white">Problemas Complexos</p>
                    </div>
                </div>
                <div class="col-6 column">
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[1].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="aprendizado" color="secondary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Aprendizado</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[3].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="negociacao" color="secondary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Negociação</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[5].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="gestao" color="secondary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Gestão de Pessoas</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[7].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="emocao" color="secondary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Inteligência Emocional</p>
                    </div>
                    <div class="row flex flex-center q-ma-xs">
                        <img width="5px" height="5px" class="col-3" :src="icones[9].icone" alt=""> <q-linear-progress rounded style="height: 5px" :value="decisao" color="secondary" class="col-7 q-mx-xs" />
                    <p class="textcap text-white">Tomada de Decisão</p>
                    </div>
                </div>
            </div>
        </div>
            <div v-if="cards.length == 0"> 
                <h6 class="q-mt-xl text-white lulo">
                    Olá {{ user.nome }},
                </h6>
                <div class="column">
                <q-radio v-model="sexo" val="masculino" color="secondary" label="Masculino" />
                <q-radio v-model="sexo" val="feminino" color="secondary" label="Feminino" />
                </div>
                <q-btn @click="iniciar" :disable="sexo == 'neutro'" color="positive" label="Vamos começar?"></q-btn>
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
      sexo: 'neutro',
      numero: 1
    };
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      cards: "cards",
      icones: "jornada"
    }),
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
      console.log(this.aprendizado, this.coordenacao)
        this.$store.dispatch('userCadastrado')
  },
  methods: {
    iniciar() {
        const user = this.user
        user.sexo = this.sexo 
        this.$store.dispatch('createOrUpdateOnFirestore', user)
        this.$store.dispatch('userCadastrado')
    },
    atualizar() {
        this.$store.dispatch('userCadastrado')
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
  .masculino {
    background-color: #027be3
  }
  .feminino {
    background-color: #ff4081
  }
  .neutro {
    background-color: #ffc107
  }
</style>