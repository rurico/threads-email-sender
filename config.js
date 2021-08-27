const { readJSON } = require('./io')

const { transport, mailOptions, receivers } = readJSON('config.json')
const { completion } = readJSON('.cache/sendCache.json', { completion: [] })

module.exports = { transport, mailOptions, receivers, completion }