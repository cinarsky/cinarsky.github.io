const sqlite=require('sqlite')
const dbPromise=sqlite.open(__dirname+'/db/restaurant.db')
module.exports=dbPromise