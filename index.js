const database = require('./models/database');
const db = new database.Database();

setInterval(() => { // Check every two minutes for new articles, if found, store them in the collection.
    db.storeArticleInDb();
}, 120000)
