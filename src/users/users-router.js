const express = require('express');
const UsersService = require('./users-service');
const requireAuth = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req,res,next) => {
    const { username, password, type  } = req.body;

    for (const field of ['username', 'password', 'type'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const typeError = UsersService.validateType(type);
    if (typeError) {
      return res.status(400).json({ error: typeError });
    }
  
    const passwordError = UsersService.validatePassword(password);

    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    };
  
    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName) {
          return res.status(400).json({ error: `Username already taken` });
        };

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword,
              type: type,
            };

          return UsersService.insertUser(
            req.app.get('db'),
            newUser
          )
          .then(user => {
            res
              .status(201)
              .json(UsersService.serializeUser(user));
          });
        });
    })
    .catch(next);
  })
  // .get('/data', requireAuth, jsonBodyParser, (req,res,next) => {
  //   const type = req.user.type;
  //   const id = req.user.id;

  //   res
  //     .status(200)
  //     .json({type, id})
  // })

module.exports = usersRouter;