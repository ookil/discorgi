const { ForbiddenError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports.auth = ({ req }) => {
  const auth = req.headers && req.headers.authorization;
  if (!auth) throw new ForbiddenError('Authorization denied');

  const token = auth.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    throw new ForbiddenError('Invalid token');
  }
};
