const express = require("express");
const router = express.Router();

const Aluno = require("../models/Aluno.model");
const Planos = require("../models/Planos.model");

router.get("/home", (req, res, next) => {
  const userInSession = req.session.currentUser;
  res.render("private/home", userInSession);
});

router.get("/private/aluno", (req, res, next) => {
  const user_id = req.session.currentUser._id;
  Aluno.find({ user_id })
    .then((alunosFromDb) => {
      res.render("private/aluno", { alunos: alunosFromDb });
    })
    .catch((error) => next(error));
});

router.get("/private/aluno-cadastro", (req, res, next) =>
  res.render("private/aluno-cadastro")
);

router.post("/private/aluno-cadastro", (req, res, next) => {
  const user_id = req.session.currentUser._id;
  const { nome, email, planos, inicioPlanos, aniversario, telefone } = req.body;
  Aluno.create({
    nome,
    email,
    planos,
    inicioPlanos,
    aniversario,
    telefone,
    user_id,
  })
    .then((alunoFromDb) => {
      res.redirect("/private/aluno");
    })
    .catch((error) => next(error));
});

router.get("/private/aluno/editar/:id", (req, res, next) => {
  const alunoId = req.params.id;
  res.render("private/aluno-editar");
});

router.get("/private/planos", (req, res, next) => {
  const user_id = req.session.currentUser._id;
  Planos.find({ user_id })
    .then((planosFromDb) => {
      console.log("get planos =====>", planosFromDb);
      res.render("private/planos", { planos: planosFromDb });
    })
    .catch((error) => next(error));
});

router.get("/private/planos-cadastro", (req, res, next) =>
  res.render("private/planos-cadastro")
);

router.post("/private/planos-cadastro", (req, res, next) => {
  const user_id = req.session.currentUser._id;
  const { duracao, valorplano } = req.body;
  Planos.create({
    duracao,
    valor: valorplano,
    user_id,
  })
    .then((planosFromDb) => {
      console.log("isto é planoFromDb", planosFromDb);
      res.redirect("/private/planos");
    })
    .catch((error) => next(error));
});

router.get("/planos", (req, res, next) => res.render("private/editar/id"));

module.exports = router;
