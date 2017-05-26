var http = require("http"),
    fs=require("fs");

http.createServer(function(req, res){
    fs.readFile("./index.html", function(err,html){
        var html_string = html.toString();
        //Regex searchs on HTML {x} variable
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var name = "Juan Carlos";
        // varoables ['name']
        for(var i = variables.length - 1; i>=0; i--){
            /*
            Executed to get the value of this variable
            */
          var value = eval(variables[i]);
            //Replacing {x} variable with var name
            html_string=html_string.replace("{"+variables[i]+"}",value);
        };
        //Send Content
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html_string);
        res.end();
    });
}).listen(8080);