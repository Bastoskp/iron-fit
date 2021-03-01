const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const planosSchema = new Schema(
  {
    duracao: {
      type: String,
      required: [true, "tempo do plano"],
    },
    valor: {
      type: Number,
      required: [true, "valor do plano"],
    },

    user_id: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Planos", planosSchema);
