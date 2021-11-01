const database = require('./models/database');
const db = new database.Database();

setInterval(() => { // two minutes loop
    db.storeArticleInDb();
}, 120000)
