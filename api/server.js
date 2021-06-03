const express = require('express');
const server = express();

const usersRouter = require('./users/users-router');

server.use(express.json());
server.use('/api/users', usersRouter);

server.use((err, req, res, next) => {
  console.log('err handling midd kicking in!', err.message);
  res.status(err.status || 500).json({
    custom: 'something exploded inside the app',
    message: err.message,
    stack: err.stack,
  });
});

server.get('/', (req, res) => {
  res.send(`<h2>Middleware!</h2>`);
});

module.exports = server;
