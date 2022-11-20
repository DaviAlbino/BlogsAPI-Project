const express = require('express');
const router = require('./routes/login.router');
const userRouter = require('./routes/user.router');

// ...

const app = express();

app.use(express.json());

app.use('/login', router);
app.use('/user', userRouter);

// .....

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
