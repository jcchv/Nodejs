var express = require("express");
var Imagen = require("./models/imagenes")
var router = express.Router();

/* app.com/app/ */
router.get("/", function (req, res) {
    res.render("app/home")
});

/* REST */

router.get("/imagenes/new", function (req, res) {
    res.render("app/imagenes/new");
});


router.get("/imagenes/:id/edit", function (req, res) {
    Imagen.findById(req.params.id, function (err, imagen) {
        res.render("app/imagenes/edit", {
            imagen: imagen
        });
    })

});

router.route("/imagenes/:id")
    .get(function (req, res) {
        Imagen.findById(req.params.id, function (err, imagen) {
            res.render("app/imagenes/show", {
                imagen: imagen
            });
        })

    })
    .put(function (req, res) {
        Imagen.findById(req.params.id, function (err, imagen) {
            imagen.title = req.body.title;
            imagen.save(function (err) {
                if (!err) {
                    res.render("app/imagenes/show", {
                        imagen: imagen
                    });
                } else {
                    res.render("app/imagenes/" + imagen.id + "/edit", {
                        imagen: imagen
                    })
                }
            })

        })

    })
    .delete(function (req, res) {

        Imagen.findById(req.params.id, function (err, imagen) {
            imagen.remove()
        })

        Imagen.findOneAndRemove({
            _id: req.param.id
        }, function (err) {
            if (!err) {
                res.redirect("/app/imagenes");
            } else {
                console.log(err);
                res.redirect("/app/imagenes" + req.param.id);
            }
        })

    });

router.route("/imagenes")
    .get(function (req, res) {
        Imagen.find({}, function (err, imagenes) {
            if (err) {
                res.redirect("/app");
                return;
            }
            res.render("app/imagenes/index", {
                imagenes: imagenes
            });
        });
    })
    .post(function (req, res) {
        var data = {
            title: req.body.title
        }
        var imagen = new Imagen(data);
        imagen.save(function (err) {
            if (!err) {
                res.redirect("/app/imagenes/" + imagen._id);
            } else {
                res.render(err);
            }
        })
    });

module.exports = router;
