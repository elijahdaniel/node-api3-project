function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
}

const validateUserId = Users => (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Users.getById(id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: 'user not found',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Server error',
        });
      });
  } else {
    next();
  }
};

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'missing user data',
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: 'missing required name field',
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'missing post data',
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: 'missing required text field',
    });
  } else {
    req.body.user_id = req.user.id;
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
