var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
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

app.get("/signup", function (req, res) {
    User.find(function (err, doc) {
        console.log(doc);
        res.render("signup");
    });
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/users", function (req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });


    user.save().then(function (us) {
        res.send("Guardamos el usuario Exitosamente");
    }, function (err) {
        if (err) {
            console.log(String(err));
            res.send("No pudimos guardar la informacion");
        }
    });


});

app.post("/sessions", function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, docs) {
        console.log(docs);
        res.send("Hola Mundo");
    });

});

app.listen(8080);
