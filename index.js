const database = require('./models/database');
const db = new database.Database();

setInterval(() => {
    db.storeArticleInDb();
}, 60000)
