const { check } = require('express-validator');

const userValidations = {
    firstName:
        check('firstName')
            .notEmpty().withMessage('The name cannot be empty.')
            .isLength({ min: 2 }).withMessage('The name must have min 2 characters.')
            .isLength({ max: 30 }).withMessage('The name must have max 30 characters.')
            .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.')
            .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.')
            .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.')
            .matches(/^(?!(?:(([A-ZÑ][a-zñ]{1,}?)\s?)+))$/).withMessage('The name does not meet the requirements.'),

    lastName:
        check('lastName')
            .notEmpty().withMessage('The name cannot be empty.')
            .isLength({ min: 2 }).withMessage('The name must have min 2 characters.')
            .isLength({ max: 30 }).withMessage('The name must have max 2 characters.')
            .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.')
            .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.')
            .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.')
            .matches(/^(?!(?:(([A-ZÑ][a-zñ]{1,}?)\s?)+))$/).withMessage('The name does not meet the requirements.'),

    email:
        check('email')
            .notEmpty().withMessage('The email cannot be empty')
            .isEmail().withMessage('The email must be valid')
            .matches(/([-!#-;=?-[\]_{}¡°¿])([\w\d.]+)(?=@)/).withMessage('Username cannot start with a special character.')
            .not().matches(/([_.-]{2,})(?=@)/).withMessage('Username cannot end with a special character.')
            .not().matches(/(.*([.-_]){2})[\w\d.-]+(?=@)/).withMessage('Username cannot contain consecutive special characters')
            .matches(/[a-zñ0-9._-]+$/).withMessage('Username has illegal characters')
            .matches(/(?<=@)(([\w-])+\.+[\w]{2,4})$/).withMessage('The entered domain is not allowed'),

    password:
        check('password')
            .notEmpty().withMessage('The password cannot be empty')
            .isLength({ min: 8 }).withMessage('The password must have min 8 characters.')
            .isLength({ max: 16 }).withMessage('The password must have max 16 characters.')
            .not().matches(/\s+/).withMessage('The password cannot have spaces.')
            .matches(/\d/).withMessage('The password must have at least 1 number.')
            .matches(/[a-zñ]/).withMessage('The password must have at least 1 lowercase letter.')
            .matches(/[A-ZÑ]/).withMessage('The password must have at least 1 capital letter.')
            .matches(/[!-/:-@\[-`\{-~¿¡°]/).withMessage('The password must have at least 1 special character.')
            .not().matches(/[À-ÆÈ-ÏÒ-ÖÙ-Ýà-æè-ïò-öù-ýÿ]/).withMessage('The password must not have acent characters.')
    ,
    image:
        check('imagen')
            .notEmpty().withMessage('The image cannot be empty')
            .optional()
            .matches(/\.(jpg|jpeg|png|svg)$/i)
            .withMessage('The image format is invalid. Only .jpg, .jpeg, .png or .svg are allowed'),
    token:
        check('token')
            .notEmpty().withMessage('Token cannot be empty.')
            .isJWT().withMessage('Invalid token format.') // Utiliza .isJWT() para validar el formato del token JWT
}


const userSignUp = [
    userValidations.email,
    userValidations.password,
]

const userActivate = [
    userValidations.token,
]

module.exports = {
    userSignUp,
    userActivate
};