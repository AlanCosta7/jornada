<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { $analytics } from 'boot/firebase'

export default {
  name: 'App',
  methods: {
    doUpdate () {
      $analytics.logEvent('sw_update_done')
      window.location.reload(true)
    },
    doCancel () {
      $analytics.logEvent('sw_update_cancel')
      document.querySelector('#new-version-available').classList.remove('show')
    }
  }
}
</script>