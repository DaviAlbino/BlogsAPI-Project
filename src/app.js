const express = require('express');
const categoryRouter = require('./routes/categories.router');
const router = require('./routes/login.router');
const postRouter = require('./routes/post.router');
const userRouter = require('./routes/user.router');

// ...

const app = express();

app.use(express.json());

app.use('/login', router);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

// .....

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
