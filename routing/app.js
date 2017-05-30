var express = require("express");
var app = express();
app.set("view engine", "jade");

app.get("/", function (req, res) {
    res.render("index");
});

//Path Variable
app.get("/:nombre", function (req, res) {
    console.log(req.params.nombre)
    res.render("form", {
        nombre: req.params.nombre
    });
});

app.post("/", function (req, res) {
    res.render("form");

});
app.listen(8080);
