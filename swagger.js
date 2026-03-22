const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API for managing vehicles and drivers',
    },
    host: 'project2-k2u1.onrender.com',
    schemes: ['https'],
}; 

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);