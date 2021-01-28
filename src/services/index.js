const geekServiceModule = require('./geek')

module.exports = ({ axios }) => {

  const geekService = geekServiceModule({ axios })

  return {
    geekService
  }
}
