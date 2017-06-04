var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use("/public", express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("view engine", "jade");

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/users", function (req, res) {
    console.log("Password: " + req.body.password);
    console.log("Email: " + req.body.email);
    res.send("Data uploaded");
});

app.listen(8080);
