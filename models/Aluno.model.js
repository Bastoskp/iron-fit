const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const alunoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "nome obrigatório"],
    },
    email: {
      type: String,
      required: [true, "email obrigatório"],
    },
    planos: {
      type: String,
      required: [true, "informar plano"],
    },

    inicioPlano: {
      type: Date,
    },

    aniversario: {
      type: Date,
    },

    telefone: String,

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = model("Aluno", alunoSchema);
