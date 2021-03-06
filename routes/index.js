const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.render("login", { layout: false });
});

// rota feita com async await

router.post("/login", async (req, res, next) => {
  console.log("SESSION =====>", req.session);
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("login", {
      errorMessage: "Por favor entrar com email e senha para login",
      layout: false,
    });
    return;
  }
  let userFromDb;
  try {
    userFromDb = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }

  if (!userFromDb) {
    res.render("login", {
      errorMessage: "Email não registrado. Tente com outro e-mail",
      layout: false,
    });
    return;
  } else if (bcryptjs.compareSync(password, userFromDb.passwordHash)) {
    console.log("userFromDb ===>", userFromDb);
    req.session.currentUser = userFromDb;
    console.log("currentUser ===>", req.session.currentUser);
    res.render("private/home", { userInSession: req.session.currentUser });
  } else {
    res.render("login", {
      errorMessage: "Password incorreto",
      layout: false,
    });
  }
});

router.get("/signup", (req, res, next) => {
  res.render("signup", { layout: false });
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("signup", {
      errorMessage:
        "A senha precisa ter pelo menos 6 caracteres e deve conter pelo menos um número, uma letra minúscula e uma letra maiúscula.",
      layout: false,
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      User.create({
        nome: username,
        email,
        passwordHash: hashedPassword,
      })
        .then((userFromDb) => {
          console.log("Novo usuario", userFromDb);
          req.session.currentUser = userFromDb;
          res.redirect("/home");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("signup", {
              errormessage: error.message,
              layout: false,
            });
          } else if (error.code === 11000) {
            console.log("teste");
            res.status(500).render("signup", {
              errorMessage: "O nome de usuário ou o e-mail já são usados.",
              layout: false,
            });
          } else {
            next(error);
          }

          return next(error);
        });
    })
    .catch((error) => next(error));
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
