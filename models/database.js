const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');
const uri = `mongodb+srv://bot:passwordhere@cluster0.1ipw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

class Database {

    async connectDb(collec = "news") {
        const connection = await client.connect();
        return connection.db("SpaceNews").collection(collec);  // Connect to MongoDb Atlas and retrieve a collection;
    }

    async createDocument(articleid, title, url, imageUrl, newsSite, publishedAt, summary, updatedAt, featured) {
        const collection = await this.connectDb();
        collection.insertOne({ articleid: articleid, title: title, url: url, imageUrl: imageUrl, newsSite: newsSite, publishedAt: publishedAt, summary: summary, updatedAt: updatedAt, featured: featured }).then(r => {
            console.log(`article ${articleid} has been successfully inserted !`);
        }).catch(err => {
            console.log(err);
        })
    }

    async removeDocument(articleid) {
        const collection = await this.connectDb();
        collection.deleteOne({ articleid: articleid }).then(r => {
            console.log(`article ${articleid} has been successfully deleted !`);
        }).catch(err => {
            console.log(err);
        })
    }

    async documents() {
        const collection = await this.connectDb();
        return collection.find().toArray();
    }

    async checkArticleId() { // Return the current articleid stored in the database.
        const collection = await this.connectDb('dataFromApi');
        const dataArray = await collection.find().toArray();
        const articleid = dataArray[0].articleid;
        return articleid;
    }

    async updateArticleId(id) { // Set the new articleid in database.
        const collection = await this.connectDb('dataFromApi');
        const currentArticleId = await this.checkArticleId();

        await collection.findOneAndUpdate({ articleid: currentArticleId }, { $set: { articleid: id } }).then(r => {
            console.log(`✅ new articleid updated ! (${id})\n`);
        })
    }

    async checkIfNewArticle() {  // Fetch articles & check if there is a new one, if yes return the data (true) else return false.
        const data = await fetch('https://api.spaceflightnewsapi.net/v3/articles').then(r => r.json());
        const articleId = data[0].id;
        const currentArticleId = await this.checkArticleId();

        if (currentArticleId === articleId) { console.log('❌ there is no new article.\n'); return false };
        if (currentArticleId != articleId) {

            await this.updateArticleId(articleId);
            return data[0]; //return data (true) or false.
        }
    }

    async storeArticleInDb() { // If there's a new article, push it in the database.
        const newarticle = await this.checkIfNewArticle();
        if (newarticle) {
            // push article in DB
            console.log("pushing the article...");
        }
    }


}



module.exports = { Database };
