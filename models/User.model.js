const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "nome obrigatório"],
    },
    email: {
      type: String,
      required: [true, "email obrigatório"],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "favor colocar sua senha"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
