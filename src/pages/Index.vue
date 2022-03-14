<template>
  <q-page class="fit flex flex-center">
    <section class="fit flex flex-center container " style="min-height: 100vh">
      <q-img
        src="../assets/bg_jornada.png"
        class="bgimg"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div class="column fit flex flex-center q-gutter-md q-pb-xl" style="max-width: 700px">
          <q-img
            src="../assets/jovem.png"
            width="70vw"
            style="max-width: 300px"
            height="auto"
            spinner-color="primary"
            spinner-size="82px"
          />
          <div class="text-h3 text-black text-weight-bolder text-uppercase">Projeto gameficado para ministério com jovens</div>
          <div class="text-h6 text-black text-weight-regular">A Jornada é um game para jovens e adolescentes desenvolverem as habilidades do futuro realizando desafios. Com o app da <b>JORNADA</b> você poderá criar desafios, adicionar pontos e os jovens poderão acompanhar seus desempenhos.</div>

          <q-btn color="black" label="Começar" @click="onLogin" />

      </div>
    </section>

    <section class="bg-black fit flex flex-center container" style="min-height: 100vh">
      <div class="fit row wrap justify-around items-start content-start q-py-xl" style="max-width: 900px">
        <div class="column col-xs-12 col-sm-12 col-md-9 col-lg-9 q-gutter-md">
          <div class="text-h3 text-white text-left text-weight-bolder text-uppercase">Desafios colaborativos</div>
          <div class="text-h6 text-white text-weight-regular">Todos os desafios são públicos. Assim você poderá usar desafios da comunidade ou colaborar criando seus próprios desafios. Seja um criador de desafios para ajudar a comunidade!</div>
          <div class="fit row justify-center">
            <q-btn color="white" outline label="Começar" @click="onLogin" />
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <q-img
            src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Adventure_Map_2913095.svg?alt=media&token=cf350a22-a039-45c1-a7f1-8e7a587354c1"
            width="200px"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
      </div>
    </section>

    <section class="bg-grey fit flex flex-center container" style="min-height: 100vh">
      <div class="fit row wrap justify-around items-start content-start q-py-xl " style="max-width: 900px">
        <div class="column col q-gutter-md">
          <div class="text-h3 text-white text-left text-weight-bolder text-uppercase">Habilidades do futuro</div>
          <div class="text-h6 text-white text-weight-regular">Potencialize sua vida para não perder oportunidades </div>
          <div class="text-white text-weight-regular">O mundo está em constante mudanças e precisamos estar sempre preparados. A vida é uma grande jornada, e nessa jornada você precisa desenvolver habilidades. Aqui você terá oportunidade de melhorar seu desempenho em várias áreas de sua vida de forma integral. Vamos juntos buscar maturidade espiritual e descobrir nosso propósito no mundo.</div>
          <div class="row fit justify-center">
            <q-carousel
              v-model="slide"
              animated
              control-type="push"
              control-color="purple"
              padding
              arrows
              style="max-width: 400px; width: 94vw"
              height="500px"
              class="text-purple rounded-borders q-pa-none q-ma-none"
            >
              <q-carousel-slide name="criatividade" class="column flex q-pa-none q-ma-none flex-center">

                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Potion_2913113.svg?alt=media&token=2fdcb5bf-598f-46d9-97ab-68a079b6be60"
                    width="100px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                <div class="text-center text-black">
                  <h6>Criatividade</h6>
                  <div class="text-bold">Entender profundamente a necessidade, o problema e soluções criativas.</div>
                  <div>A Criatividade é uma habilidade humana. Ela está diretamente relacionada a maneira como resolvemos problemas e a nossa capacidade imaginativa.</div>
                  <div><a target="_black" href="https://medium.com/crist%C3%A3os-millennials/criatividade-308930b97075">Leia mais...</a></div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="trabalhoEmEquipe" class="column no-wrap flex-center">
                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Sword_2913105.svg?alt=media&token=d0a97ac0-e3b7-4bbf-be14-a53bf5b81d51"
                    width="100px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                  <div class="text-center text-black">
                  <h6>Trabalho em equipe</h6>
                  <div class="text-bold">Trabalhar conectado com outros.</div>
                  <div>Entender e estar em sintonia com sua equipe de trabalho é um desafio, coordenar sua equipe com outras equipes é ainda maior. Está na hora de pôr em prática essa habilidade.</div>
                  <div><a target="_black" href="https://medium.com/crist%C3%A3os-millennials/coordena%C3%A7%C3%A3o-6619261b2e0f">Leia mais...</a></div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="inteligenciaEmocional" class="column no-wrap flex-center">

                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Unicorn_2913106.svg?alt=media&token=8e087c4a-cccd-43d4-8a4d-a4352da4e04d"
                    width="100px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                  <div class="text-center text-black">
                  <h6>Inteligência emocional</h6>
                  <div class="text-bold">Como lidar com situações estressantes?.</div>
                  <div>Nesse exato momento seu cérebro está tentando interpretar o mundo externo. Ele está analisando cada sinal do ambiente e construindo um ideia de realidade. Emoção é a reação que o nosso corpo promove a esses sinais. Será que é possível controlar as nossas emoções?</div>
                  <div><a target="_black" href="https://medium.com/crist%C3%A3os-millennials/intelig%C3%AAncia-emocional-eb384b6f43f4">Leia mais...</a></div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="lideranca" class="column no-wrap flex-center">

                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_King_2913101.svg?alt=media&token=673ba90b-f35e-4739-b6a6-f5692a747701"
                    width="100px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                  <div class="text-center text-black">
                  <h6>Liderança</h6>
                  <div class="text-bold">A necessidade de fazer gestão no contexto de serviço.</div>
                  <div>Nesse exato momento seu cérebro está tentando interpretar o mundo externo. Ele está analisando cada sinal do ambiente e construindo uma ideia de realidade. Emoção é a reação que o nosso corpo promove a esses sinais. Será que é possível controlar as nossas emoções?</div>
                  <div><a target="_black" href="https://medium.com/crist%C3%A3os-millennials/intelig%C3%AAncia-emocional-eb384b6f43f4">Leia mais...</a></div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="tomadaDeDecisao" class="column no-wrap flex-center">

                  <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Knight_2913116.svg?alt=media&token=f791fae4-1b93-414f-81b6-0d0386633fed"
                    width="100px"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                  <div class="text-center text-black">
                  <h6>Tomada de Decisão</h6>
                  <div class="text-bold">Acredite, não é só para líderes.</div>
                  <div>Ao longo do dia vamos usar nosso cérebro para inúmeras situações. Precisamos processar o máximo de informação possível e estar prontos. Mas, prontos para que? Para tomar boas decisões. Das menos as mais significativas. </div>
                  <div><a target="_black" href="https://medium.com/crist%C3%A3os-millennials/tomada-de-decis%C3%A3o-170d4b54ac10">Leia mais...</a></div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white fit flex flex-center container" style="min-height: 100vh">
      <div class="fit row wrap justify-around items-start content-start q-py-xl " style="max-width: 900px">
        <div class="row">
          <div class="column col-xs-12 col-sm-12 col-md-9 col-lg-9 q-gutter-md">
            <div class="text-h3 text-black text-left text-weight-bolder text-uppercase">Seja um doador</div>
            <div class="text-h6 text-black text-weight-regular">O aplicativo é 100% gratuito mas você pode colaborar doando para a manutenção desse projeto</div>
            <div class="text-black text-weight-regular">Os valores recebidos serão aplicados nas despesas com o aplicativo e investidos no ministério com juventude da Igreja Batista Bosue do Ipê.</div>

            <div class="text-black q-mt-xl">
              <p class="text-h6">Igreja Batista Bosque do Ipê</p>
              <div class="text-bold">Bradesco</div>
              Agência: 1284 <br>
              Conta Corrente: 23992-5 <br>
              PIX: 15667061/0001-84
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <q-img
              src="https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Item_Bag_2913117.svg?alt=media&token=4ed05aec-2315-461e-a3f8-c2d21aed6464"
              width="200px"
              spinner-color="primary"
              spinner-size="82px"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      slide:'criatividade',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'

    }
  },
  methods: {
    onLogin() {
      this.$router.push({name: 'projetos'})
    }
  },
}
</script>
