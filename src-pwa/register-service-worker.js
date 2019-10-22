import { register } from 'register-service-worker'

window.__refreshing = false

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    if (process.env.DEV) {
      console.log('App is being served from cache by a service worker.')
    }
  },

  registered (/* registration */) {
    if (process.env.DEV) {
      console.log('Service worker has been registered.')
    }
  },

  cached (/* registration */) {
    if (process.env.DEV) {
      console.log('Content has been cached for offline use.')
    }
  },

  updatefound (/* registration */) {
    if (process.env.DEV) {
      console.log('New content is downloading.')
    }
  },

  updated (/* registration */) {
    
    if (window.confirm('Existe uma versão disponível. Deseja atualizar?')) {
      // window.__refreshing = true
      window.location.reload(true)
    } else {
      console.info('Nova versão ignorada pelo usuário.')
    }
  },

  offline () {
    if (process.env.DEV) {
      console.log('No internet connection found. App is running in offline mode.')
    }
  },

  error (err) {
    if (process.env.DEV) {
      console.error('Error during service worker registration:', err)
    }
  }
})
