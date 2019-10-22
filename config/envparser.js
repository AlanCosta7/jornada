const DotEnv = require('dotenv')
const isMock = _isMock()
const dotenvConfig = {
  path: '.env.prod'
}

module.exports = function() {
  const parsedEnv = DotEnv.config(dotenvConfig).parsed

  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }

  const customENVS = ['APP_ENV']
  for (let key of customENVS) {
    if (key in process.env) {
      parsedEnv[key] = JSON.stringify(process.env[key])

      if (key === 'APP_ENV') {
        parsedEnv['isDev'] = process.env[key] === 'dev'
      }
    }
  }

  return parsedEnv
}

function _isMock() {
  return 'APP_ENV' in process.env && process.env['APP_ENV'] === 'mock'
}
