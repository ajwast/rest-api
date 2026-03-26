# Step by step

## Install dependecies

```bash
npx express-generator --view=ejs
```

- sequelize
- mysql2
- jsonwebtoken
- jest
- @types/jest
- supertest
- swagger-autogen
- swagger-ui-express

## Setup Scripts
```
"scripts": {
    "start": "node ./bin/www",
    "swagger": "node swagger.js",
    "dev": "node swagger.js && node ./bin/www",
    "test": "jest"
  }
```

## Setup Database

- models/index.js