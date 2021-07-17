<template>
  <q-page class="backgroud">
    <div class="fit row wrap justify-around items-start content-around">
      <img width="270px" class="imgIndex" src="../../assets/icons/jovem.png" alt="">
      <div class="fit row justify-start ">
        <Projects ></Projects>
      </div>
    </div>
  </q-page>
</template>

<script>
import Projects from '../../components/projects.vue'

export default {
  name: 'PageIndex',
  components: {
    Projects
  }
}
</script>

<style lang="stylus" scoped>
  .backgroud {
      background-image: linear-gradient(to bottom right, $light-blue-14, white);
  }
</style>
