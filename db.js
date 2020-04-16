const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

// Cria a tablea
db.run(`
CREATE TABLE IF NOT EXISTS ideas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    link TEXT
);
`)

// Deletar uma idea do banco 

db.run(`DELETE FROM ideas WHERE id= ?`, [], function(err){
    if (err)  return console.log(err)

    console.log("DELETEI", this)

})

module.exports = db