const http = require('http')
const app = require('./server');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '.env')});

const host = process.env['HOST'];
const port = process.env['PORT'];

const httpServer = http.createServer(app);

httpServer.listen(port, host, ()=>{
    console.log("PingMe backend running on http://"+host+":"+port+"\n");
});
