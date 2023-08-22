const { check, body } = require("express-validator");

const validateHotel = [
    body("name")
        .notEmpty().withMessage("The name cannot be empty.")
        .isLength({ min: 3 }).withMessage("The name must have min 3 characters.")
        .isLength({ max: 30 }).withMessage("The name must have max 30 characters.")
        .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.')
        .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.')
        .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.'),

    body("category")
        .notEmpty().withMessage("The category cannot be empty.")
        .matches(/^[1-5]$/).withMessage("The category must be between 1 to 5."),

    body('services')
        .isArray().withMessage('Los servicios deben ser un arreglo.')
        .custom(services => {
            const validServices = ['all inclusive', 'breakfast', 'lunch', 'dinner', 'bar'];
            const invalidServices = services.filter(service => !validServices.includes(service));

            if (invalidServices.length > 0) {
                throw new Error(`Los siguientes servicios no son válidos: ${invalidServices.join(', ')}`);
            }

            return true;
        }),

    body("room.name")
        .notEmpty().withMessage("The name cannot be empty.")
        .isLength({ min: 3 }).withMessage("The name must have min 3 characters.")
        .isLength({ max: 30 }).withMessage("The name must have max 30 characters.")
        .matches(/^(?!.*\s{2,}).*$/).withMessage('The name cannot have multiple spaces in a row.')
        .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The name cannot start with special characters.')
        .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The name cannot end with special characters.'),
    body("room.price")
        .notEmpty().withMessage("The price cannot be empty.")
        .isNumeric().withMessage("The price must be a number.")
        .custom(price => {
            if (price < 1) throw new Error("The price must be greater than 0.");
            return true;
        }),
    body("room.stock")
        .notEmpty().withMessage("The stock cannot be empty.")
        .isNumeric().withMessage("The stock must be a number.")
        .custom(stock => {
            if (stock < 0) throw new Error("The price must be greater than or equal to 0.");
            return true;
        }),

    body("country")
        .notEmpty().withMessage("The country cannot be empty.")
        .isLength({ min: 3 }).withMessage("The country must have min 3 characters.")
        .isLength({ max: 30 }).withMessage("The country must have max 30 characters.")
        .matches(/^(?!.*\s{2,}).*$/).withMessage('The country cannot have multiple spaces in a row.')
        .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The country cannot start with special characters.')
        .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The country cannot end with special characters.'),

    body("state")
        .notEmpty().withMessage("The state cannot be empty.")
        .isLength({ min: 3 }).withMessage("The state must have min 3 characters.")
        .isLength({ max: 30 }).withMessage("The state must have max 30 characters.")
        .matches(/^(?!.*\s{2,}).*$/).withMessage('The state cannot have multiple spaces in a row.')
        .matches(/^([!-/:-@\[-`\{-~¿¡°])/).withMessage('The state cannot start with special characters.')
        .matches(/([!-/:-@\[-`\{-~¿¡°])$/).withMessage('The state cannot end with special characters.'),

    body("address")
        .notEmpty().withMessage("The state cannot be empty.")
        .isLength({ min: 3 }).withMessage("The address must have min 3 characters.")
        .isLength({ max: 100 }).withMessage("The address must have max 100 characters.")
        .matches(/^(?!.*\s{2,}).*$/).withMessage('The address cannot have multiple spaces in a row.'),

    body("roomService")
        .optional()
        .isBoolean().withMessage("The room service field must be a boolean."),

    body("wifi")
        .optional()
        .isBoolean().withMessage("The wifi field must be a boolean."),

    body("isActive")
        .optional()
        .isBoolean().withMessage("The isActive field must be a boolean."),
];

module.exports = validateHotel;
