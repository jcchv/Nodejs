var http = require("http");
var handler = function(request, response) {
    console.log("New request!");  
    response.end("Hello World");
};
var server = http.createServer(handler);
        server.listen(8080);