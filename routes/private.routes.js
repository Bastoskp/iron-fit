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
  console.log(user_id);
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
  const { id } = req.params;

  Aluno.findById(id)
    .then((alunoFromDb) => {
      res.render("private/aluno-editar", { alunoFromDb });
    })
    .catch((error) => console.log("erro do editar", error));
});

router.post("/private/aluno/editar/:id", (req, res, next) => {
  const { id } = req.params;
  // const user_id = req.session.currentUser._id;
  const { nome, email, planos, inicioPlanos, aniversario, telefone } = req.body;

  Aluno.findByIdAndUpdate(
    id,
    { nome, email, planos, inicioPlanos, aniversario, telefone },
    { new: true }
  )
    .then((alunoFromDb) => {
      console.log(alunoFromDb);
      res.redirect("/private/aluno");
    })
    .catch((error) => console.log(`Erro em atualizar aluno: ${error} `));
});

// ROUTE DELETE ALUNO

router.post("/aluno/:id/delete", (req, res) => {
  const { id } = req.params;

  Aluno.findByIdAndDelete(id)
    .then(() => res.redirect("/aluno"))
    .catch((error) => console.log(`Error while deleting a plano: ${error}`));
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

router.get("/private/planos/editar/:id", (req, res, next) => {
  const { id } = req.params;

  Planos.findById(id)
    .then((planosFromDb) => {
      res.render("private/planos-editar", { planosFromDb });
    })
    .catch((error) => console.log("erro do editar", error));
});

router.post("/private/planos/editar/:id", (req, res, next) => {
  const { id } = req.params;
  const { duracao, valor, user_id } = req.body;
});

// ROUTE DELETE PLANO
router.post("/planos/:id/delete", (req, res) => {
  const { id } = req.params;

  Planos.findByIdAndDelete(id)
    .then(() => res.redirect("/planos"))
    .catch((error) => console.log(`Error while deleting a plano: ${error}`));
});

module.exports = router;
