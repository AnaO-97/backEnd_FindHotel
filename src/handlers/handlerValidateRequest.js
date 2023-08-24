const { validationResult } = require('express-validator');


const handlerValidateRequest = (middleware) => {
    return (req, res, next) => {
        // Ejecutar el middleware de validación proporcionado (userSignUpMiddleware)
        middleware(req, res, (error) => {
            if (error) {
                return res.status(422).json({ errors: error.array() });
            }
            next();
        });
    };
};

module.exports = handlerValidateRequest