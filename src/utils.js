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
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize); // no cursor so reeturning first batch of results

  const cursorIndex = results.findIndex((item) => {
    // if an item has a 'cursor' on it - use it, otherwise generate one
    let itemCursor = item.id ? item.id : getCursor(item);

    console.log(itemCursor);
    
    // if still no cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
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
