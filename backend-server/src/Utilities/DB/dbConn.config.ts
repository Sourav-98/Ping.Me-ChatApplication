
const dbConfig = {
    uri: 'mongodb+srv://sourav1998:Sourav1998$@pingme-cluster98516.12p2n.mongodb.net',
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
