export function notFoundHandler(req, res, next) {
  const notFoundError = new Error(`Not Found: ${req.method} ${req.url}`);
  res.status(404);
  next(notFoundError);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const error = {
    message: err.message
  };
  if (process.env.NODE_ENV !== 'production' && statusCode === 500) error.stack = err.stack;
  res.json(error);
}
