var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/curso_node");
var posibles_valores = ["M", "F"]

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email"]

var password_validation = {
    validator: function (p) {
        return this.password_confirmation == p;
    },
    message: "Las contrasenias no son iguales"
}

var user_schema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        maxlength: [50, "Username muy grande"]
    },
    password: {
        type: String,
        minlength: [8, "Password to short"],
        validate: {
            validator: function (p) {
                return this.password_confirmation == p;
            },
            message: "Las passwords no son iguales"
        }
    },
    age: {
        type: Number,
        min: [5, "La edad no puede ser menor que 5"],
        max: [100, "La edad no puede ser mayor que 100"]
    },
    email: {
        type: String,
        required: "El correo es Obligatorio",
        match: email_match
    },
    date_of_birth: Date,
    sex: {
        type: String,
        enum: {
            values: posibles_valores,
            message: "Opcion no Valida"
        }
    }
});



user_schema.virtual("password_confirmation").get(function () {
    return this.p_c;
}).set(function (password) {
    this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
/*
Mongo Data Types
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    Objectid
    Array
*/
