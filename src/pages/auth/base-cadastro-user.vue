<template>
  <q-layout id="pageInitUser" class="row fit justify-center">
    <section class="column q-pa-sm" style="max-width: 700px">
      <!-- Avatar -->
      <div class="q-pa-md row justify-center">
        <div class="col-12 text-bold q-pa-md">1. Selecione uma imagem de perfil</div>
        <q-avatar size="80px" class="relative-position" >
          <q-img
            width="80px"
            :src="user.photoURL"
            alt="Foto da persona"
          >
          </q-img>
        </q-avatar>
        <template class="col-12">
          <div class="row q-pa-lg">
            <q-list bordered v-for="(item, index) in optionsAvatar" :key="index" class="col-4 flex flex-center ">
              <q-item clickable v-ripple @click="selectPhoto(item)">
                <q-avatar size="50px" class="relative-position">
                  <q-img
                    :src="item.src"
                    alt="Foto da persona"
                  >
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-negative text-white">
                      Não encontramos sua foto de perfil
                    </div>
                  </template>
                  </q-img>
                </q-avatar>
              </q-item>
            </q-list>

          <div class="full-width	q-pa-xs">
            <input
              ref="photoInput"
              debounce="500"
              type="file"
              @change="onPhotoURLPicked"
              name="photo"
              style="display: none;"
              accept="image/*"
            />
            <q-btn
              class="full-width"
              color="black"
              outline
              size="md"
              @click="onPickPhoto()"
              icon="cloud_upload"
              label="upload da foto"
            ></q-btn>
          </div>
          <div class="q-mt-md full-width">
            <q-input outlined dense class="full-width" v-model="user.displayName" type="text" label="Nome" />
          </div>
            </div>
        </template>
      </div>
      <div class="text-center row items-center q-gutter-md justify-center">
        <q-btn color="negative" outline label="Cancelar" @click="onCancel" />
        <q-btn color="positive" label="Salvar" @click="onInicio" />
      </div>
    </section>
  </q-layout>
</template>

<script>
import Vuex from "vuex";

export default {
  data() {
    return {
      maximized: true,
      sucessCadastro: false,
      filePhotoURL: null,
      optionsAvatar: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Elf_2913120.svg?alt=media&token=b545801f-8244-4654-8d31-b10306fb861d'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Grim_Reaper_2913100.svg?alt=media&token=418ad552-9334-443b-9401-7e54dd696df3'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_King_2913101.svg?alt=media&token=673ba90b-f35e-4739-b6a6-f5692a747701'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Knight_2913116.svg?alt=media&token=f791fae4-1b93-414f-81b6-0d0386633fed'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Orc_2913114.svg?alt=media&token=4fe3df64-fca6-4e75-95ff-806116df5aff'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Sorceress_2913112.svg?alt=media&token=0421988c-80ab-4a47-a6b3-1467cd3e46ff'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Viking_2913107.svg?alt=media&token=daf379d7-ada9-4c62-8772-ecd5cdaf76f4'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Villager_2913108.svg?alt=media&token=5434990e-f544-41ab-8403-5c492f7f699b'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/jornada-jovem.appspot.com/o/icon-jornada%2Ficonfinder_Werewolf_2913109.svg?alt=media&token=057f922b-b945-4fb2-88f3-51858576e6a6'
        }
      ],
    }
  },
  computed: {
    ...Vuex.mapState([
      "selectProject",
      "currentUser",
      "user"
    ])
  },
  methods: {
    // salva foto perfil
    onPickPhoto() {
      this.$refs.photoInput.click();
    },
    onPhotoURLPicked(event) {
      let uid = this.currentUser.uid
      const files = event.target.files;
      const file = files[0];
      var value = {
        uid: uid,
        collectionName: 'users',
        files: file,
        type: 'photoURL'
      }
      this.$store.dispatch('uploadPhotoURL', value)
    },
    selectPhoto(item) {
      this.user.photoURL = item.src
    },
    onInicio() {

      this.$store.dispatch('updateCadastroUser', this.user)
      var nickname = this.selectProject.data.nickname
      this.$router.push({name: 'inicio', params: { nickname: nickname } })
    },
    onCancel() {
      var nickname = this.selectProject.data.nickname
      this.$router.push({name: 'inicio', params: { nickname: nickname } })
    }
  }
}
</script>

<style>

</style>
