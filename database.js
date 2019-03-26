/* */
const mongoose = require('mongoose');

/* Seta variavel de ambiente com string do banco de dados */
const AppConstants = require('./app/constants/app');

/* Caso possua URL configurada */
if (AppConstants.DB_HOST) {
    mongoose
        .connect(AppConstants.DB_HOST, {useNewUrlParser: true})
        .then(() => {
            console.log('Conexão estabelecida com o banco de dados');
        })
        .catch((err) => {
            console.log(err.errors[0].err);
        });
}
