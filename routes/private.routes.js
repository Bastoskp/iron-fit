const express = require("express");
const router = express.Router();

router.get("/home", (req, res, next) => {
  const userInSession = req.session.currentUser;
  res.render("private/home", userInSession);
});

router.get("/alunos", (req, res, next) => res.render("private/alunos"));

router.get("/aluno/cadastro", (req, res, next) =>
  res.render("private/aluno/cadastro")
);

router.get("/aluno/editar/id", (req, res, next) =>
  res.render("private/aluno/cadastro")
);

router.get("/planos", (req, res, next) => res.render("private/planos"));

router.get("/planos/cadastro", (req, res, next) =>
  res.render("private/planos/cadastro")
);

router.get("/planos", (req, res, next) => res.render("private/editar/id"));

module.exports = router;
