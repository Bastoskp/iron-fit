const express = require("express");
const router = express.Router();

const Aluno = require("../models/Aluno.model");

router.get("/home", (req, res, next) => {
  const userInSession = req.session.currentUser;
  res.render("private/home", userInSession);
});

router.get("/private/aluno", (req, res, next) => {
  Aluno.find() //Aluno.find({user_id: "id do usuario"})
    .then((alunosFromDb) => {
      res.render("private/aluno", { alunos: alunosFromDb });
    })
    .catch((error) => next(error));
});

router.get("/private/aluno-cadastro", (req, res, next) =>
  res.render("private/aluno-cadastro")
);

router.post("/private/aluno-cadastro", (req, res, next) => {
  const { nome, email, planos, inicioPlanos, aniversario, telefone } = req.body;
  Aluno.create({
    nome,
    email,
    planos,
    inicioPlanos,
    aniversario,
    telefone,
    // user_id: req.session.currentUser._id,
  })
    .then((alunoFromDb) => {
      res.redirect("/private/aluno");
    })
    .catch((error) => next(error));
});

router.get("/private/aluno/editar/id", (req, res, next) =>
  res.render("private/aluno/editar/id")
);

router.get("/private/planos", (req, res, next) => res.render("private/planos"));

router.get("/private/planos-cadastro", (req, res, next) =>
  res.render("private/planos-cadastro")
);

router.get("/planos", (req, res, next) => res.render("private/editar/id"));

module.exports = router;
