const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedErr = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedErr('Unauthorized Error'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    // payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedErr('Unauthorized Error'));
  }

  req.user = payload;

  return next();
};
