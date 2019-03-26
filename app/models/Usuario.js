/* Importação de dependencias */
const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

/* Importação de Plugins */
const SenhaPlugin = require("../plugins/Senha.plugin");

const UsuarioSchema = new Mongoose.Schema({
  usuario: {
    type: String,
    require: [true, "não pode ser vazio"],
    index: true,
    unique: true
  },
  salt: {
    type: String,
    required: [true, "não pode ser vazio"]
  },
  hash: {
    type: String,
    required: [true, "não pode ser vazio"],
    maxlength: 1024
  }
});

/* Registra plugin para o model. */
UsuarioSchema.plugin(UniqueValidator, { mensagem: "já existe" });
UsuarioSchema.plugin(SenhaPlugin);

Mongoose.model("Usuario", UsuarioSchema);
