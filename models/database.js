const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://bot:PASSWORDHERE@cluster0.1ipw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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

}

module.exports = { Database };
