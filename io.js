const { readFileSync, writeFile } = require('fs')

const readJSON = (path, defaultValue = {}) => (str => JSON.parse(str) ?? defaultValue)(readFileSync(path))
const writeCache = caches => writeFile('.cache/sendCache.json', JSON.stringify(caches), (e) => console.error)
const writeLogs = log => writeFile('logs/fail-log.json', log, { 'flag': 'a' }, (e) => console.error)

module.exports = { readJSON, writeCache, writeLogs }