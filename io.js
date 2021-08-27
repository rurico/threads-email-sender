const { readFileSync, writeFile } = require('fs')

const readJSON = (path, defaultValue = {}) => (str => {
    try { return JSON.parse(str) } catch (_) {
        console.log(`解析文件 ${path} 报错，请检查配置`)
        return defaultValue
    }
})(readFileSync(path))
const writeCache = caches => writeFile('.cache/sendCache.json', JSON.stringify(caches), (e) => console.error)
const writeLogs = log => writeFile('logs/fail-log.json', log, { 'flag': 'a' }, (e) => console.error)

module.exports = { readJSON, writeCache, writeLogs }