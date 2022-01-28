
let dbConfig = {
    uri: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 3000, 
        socketTimeoutMS: 5000
    }, 
    db: 'test-chat-app'
}

module.exports = {dbConfig}
