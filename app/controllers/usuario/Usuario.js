/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Importação Models */
const Usuario = Mongoose.model("Usuario");

/* Controller responsável pela criação de novos serviços em que possa ser gerado um */
exports.criar = function(req, res, next) {
  let body = req.body;

  let usuario = new Usuario();
  usuario.usuario = body.usuario;
  usuario.geradorSaltHash(body.senha);

  usuario
    .save()
    .then(usuarioCriado => {
      return res.status(201).send({
        ...usuarioCriado
      });
    })
    .catch(next);
};
