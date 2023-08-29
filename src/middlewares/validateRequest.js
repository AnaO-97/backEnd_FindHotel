const { validationResult } = require('express-validator');


const handlerValidateRequest = (middleware) => {
    return (req, res, next) => {
        const objBody = Object.values(req.body);
        // const objQuery = Object.values(req.query);
        // const objParams = Object.values(req.params);
        // const request = [...objBody, ...objQuery, ...objParams]

        middleware(req, res, (error) => {
            const error = validationResult(request)
            if (error) {
                return res.status(422).json({ errors: error.array() });
            }
            next();
        });
    };
};

module.exports = handlerValidateRequest