/* Importação de dependencias */
const _ = require('lodash');
const Joi = require('joi');

/* Importação de Schemas */
const Schemas = require('../routes/v1/validations');

/* TODO: Melhorar validação de Schemas. Permitir mensagens customizadas. Tentar simplificar e organizar melhor validações Joi. */
module.exports = (useJoiError = false) => {
    /* Validação para respostas customizadas */
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    /**
     * Métodos permitidos a serem requisitados pela API.
     * Hoje já temos validação através do express. Porém, validando pelo Joi também
     * garantimos mais um layer de segurança.
     */
    const _metodosSuportados = ['post'];

    /* Opção de configuração Joi */
    const _validationOptions = {
        abortEarly: false, // Abortar depois da ultima verificação
        allowUnknown: false, // Permite chaves desconhecidas que serão ignoradas
        stripUnknown: false // Remove chaves não conhecidas para validação
    };

    return (req, res, next) => {
        let body = req.body;
        const rota = req.route.path;
        const metodo = req.method.toLowerCase();

        /* TODO: Verificar se será necessario responder com status 405 para métodos não permitidos. */
        if (!_.includes(_metodosSuportados, metodo))
            return res.status(405).json({message: 'Método não permitido'});

        if (_.includes(_metodosSuportados, metodo) && _.has(Schemas, rota)) {
            /* Retornar o Schema da atual rota */
            const _schema = _.get(Schemas, rota);

            if (_schema) {
                // Validate req.body using the schema and validation options
                return Joi.validate(
                    body,
                    _schema,
                    _validationOptions,
                    (err, data) => {
                        if (err) {
                            // Joi Error
                            const JoiError = {
                                status: 'failed',
                                error: {
                                    original: err._object,

                                    // fetch only message and type from each error
                                    details: _.map(
                                        err.details,
                                        ({message, type}) => ({
                                            message: message.replace(
                                                /['"]/g,
                                                ''
                                            ),
                                            type
                                        })
                                    )
                                }
                            };

                            /* Formatação de erro customizada */
                            const CustomError = {
                                status: 'failed',
                                error:
                                    'Invalid request data. Please review request and try again.'
                            };

                            res.status(422).json(
                                _useJoiError ? JoiError : CustomError
                            );
                        } else {
                            /* Caso a validação do Joi não encontre nenhum erro, substituimos o que nos foi enviado pelo o que o Joi modificou.
                               Ou seja, caso haja validação de lowercase etc o objeto 'data' terá os dados já sanitizados e formatados. */
                            body = data;
                            next();
                        }
                    }
                );
            }
        }

        next();
    };
};
