var http = require('http');
require('dotenv').config()
const PORT = process.env.PORT || 3000;

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
    });

    console.log("test");

console.log('Server started');
