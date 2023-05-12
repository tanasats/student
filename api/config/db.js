const db = require('mysql2')
const Database = db.createPool({
    host:'127.0.0.1',
    database:'student',
    user:'root',
    password:'tanasat',
    port:3306,
	//timezone:'z'
})
module.exports = Database.promise();