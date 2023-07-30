
const dbConfig = {
    uri: 'mongodb://mongodb:27017',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 3000,
        // serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000
    }, 
    db: 'test-chat-app'
}

export default dbConfig;
