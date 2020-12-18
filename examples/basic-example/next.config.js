// next.config.js
const withTM = require('next-transpile-modules')(['react-psych']) // pass the modules you would like to see transpiled

module.exports = withTM()
