const swaggerAutoGen = require("swagger-autogen")();

outputFile = "./swagger-output.json";
endpoints = ["./app.js"];

swaggerAutoGen(outputFile, endpoints);
