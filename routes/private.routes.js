const express = require("express");
const router = express.Router();

router.get("/home", (req, res, next) => {
  const userInSession = req.session.currentUser;
  res.render("private/home", userInSession);
});

router.get("/private/aluno", (req, res, next) => res.render("private/aluno"));

router.get("/private/aluno-cadastro", (req, res, next) =>
  res.render("private/aluno-cadastro")
);

router.get("/private/aluno/editar/id", (req, res, next) =>
  res.render("private/aluno/editar/id")
);

router.get("/private/planos", (req, res, next) => res.render("private/planos"));

router.get("/private/planos-cadastro", (req, res, next) =>
  res.render("private/planos-cadastro")
);

router.get("/planos", (req, res, next) => res.render("private/editar/id"));

module.exports = router;
