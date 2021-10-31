const database = require('./models/database');
const db = new database.Database();

db.storeArticleInDb();

// let counter = 0;

// setInterval(() => {
//     counter++;
//     console.log(counter);
// }, 60000)
