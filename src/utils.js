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

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 30,
  results,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize); // no cursor so reeturning first batch of results

  const cursorIndex = results.findIndex((item) => {
    
    return item.id === parseInt(cursor);
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
