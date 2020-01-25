<template>
  <q-page class="backgroud column flex flex-center">
    <img width="270px" class="imgIndex" src="../assets/icons/jovem.png" alt="">
    <dir class="col-4"></dir>
    <q-btn to="/login" color="black" outline class=" q-ma-xl" label="Entrar"></q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style lang="stylus" scoped>
  .backgroud {
      background-image: linear-gradient(to bottom right, $light-blue-14, white);
  }
</style>
