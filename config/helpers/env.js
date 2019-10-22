module.exports = {
  env,
  isMock,
  isDev
}

function env(key, fallback) {
  return process.env[key] || fallback
}

function isMock() {
  return process.env['APP_ENV'] === 'mock'
}


function isDev() {
  return process.env['APP_ENV'] === 'dev'
}
