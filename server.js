/* */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

/* Configuração Express */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Importacao conexao banco de dados */
require("./database");

/* Importação dos models */
require("./app/models");

/* Configurando para usar rotas */
app.use(require("./app/routes"));

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Escutando na porta " + server.address().port);
});
