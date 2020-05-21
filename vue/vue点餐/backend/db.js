const sqlite = require('sqlite')

const dbPromise = sqlite.open(__dirname + '/db/restaurant.sqlite3')

module.exports = dbPromise
