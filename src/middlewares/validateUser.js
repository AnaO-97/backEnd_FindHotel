const { User } = require('../models');
const { check } = require('express-validator');

const userValidations = {
    firstName:
        check('firstName')
            .notEmpty().withMessage('The name cannot be empty.').bail()
            .isLength({ min: 2 }).withMessage('The name must have min 2 characters.').bail()
            .isLength({ max: 30 }).withMessage('The name must have max 30 characters.').bail()
            .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.').bail()
            .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.').bail()
            .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.').bail()
            .matches(/^(?!(?:(([A-ZÑ][a-zñ]{1,}?)\s?)+))$/).withMessage('The name does not meet the requirements.').bail(),

    lastName:
        check('lastName')
            .notEmpty().withMessage('The name cannot be empty.').bail()
            .isLength({ min: 2 }).withMessage('The name must have min 2 characters.').bail()
            .isLength({ max: 30 }).withMessage('The name must have max 2 characters.').bail()
            .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.').bail()
            .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.').bail()
            .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.').bail()
            .matches(/^(?!(?:(([A-ZÑ][a-zñ]{1,}?)\s?)+))$/).withMessage('The name does not meet the requirements.').bail(),

    email:
        check('email', 'The email field is wrong', () => { })
            .notEmpty().withMessage('The email cannot be empty').bail()
            .isEmail().withMessage('The email must be valid').bail()
            .matches(/([-!#-;=?-[\]_{}¡°¿])([\w\d.]+)(?=@)/).withMessage('Username cannot start with a special character.').bail()
            .not().matches(/([_.-]{2,})(?=@)/).withMessage('Username cannot end with a special character.').bail()
            .not().matches(/(.*([.-_]){2})[\w\d.-]+(?=@)/).withMessage('Username cannot contain consecutive special characters').bail()
            .matches(/[a-zñ0-9._-]+$/).withMessage('Username has illegal characters').bail()
            .matches(/(?<=@)(([\w-])+\.+[\w]{2,4})$/).withMessage('The entered domain is not allowed').bail()
            .custom(async (email) => {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error('Email is already registered');
                }
            }),

    password:
        check('password')
            .notEmpty().withMessage('The password cannot be empty').bail()
            .isLength({ min: 8 }).withMessage('The password must have min 8 characters.').bail()
            .isLength({ max: 16 }).withMessage('The password must have max 16 characters.').bail()
            .not().matches(/\s+/).withMessage('The password cannot have spaces.').bail()
            .matches(/\d/).withMessage('The password must have at least 1 number.').bail()
            .matches(/[a-zñ]/).withMessage('The password must have at least 1 lowercase letter.').bail()
            .matches(/[A-ZÑ]/).withMessage('The password must have at least 1 capital letter.').bail()
            .matches(/[!-/:-@\[-`\{-~¿¡°]/).withMessage('The password must have at least 1 special character.').bail()
            .not().matches(/[À-ÅÈ-ËÌ-ÏÒ-ÖÙ-Üà-åè-ëì-ïò-öù-ü]/).withMessage('The password must not have acent characters.').bail()
    ,
    image:
        check('image')
            .notEmpty().withMessage('The image cannot be empty').bail()
            .optional()
            .matches(/\.(jpg|jpeg|png|svg)$/i).bail()
            .withMessage('The image format is invalid. Only .jpg, .jpeg, .png or .svg are allowed').bail(),
    token:
        check('token')
            .notEmpty().withMessage('Token cannot be empty.').bail()
            .isJWT().withMessage('Invalid token format.').bail() // Utiliza .isJWT() para validar el formato del token JWT
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