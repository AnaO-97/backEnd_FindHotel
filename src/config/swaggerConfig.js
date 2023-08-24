const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Find Hotel',
            version: '1.0.0',
        },
    },
    apis: [
        './src/document/user.yaml',
        './src/document/hotel.yaml',
        './src/document/roomType.yaml',
        './src/document/deal.yaml',
        './src/document/rating.yaml'
    ], // Ruta al archivo principal de Swagger
};

// Genera la especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;