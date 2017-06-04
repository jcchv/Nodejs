var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/curso_node");

var userSchemaJSON = {
    email: String,
    password: String
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("User", user_schema);

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
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    })
});

app.post("/users", function (req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save(function () {
        res.send("Data uploaded");
    });

});

app.listen(8080);
