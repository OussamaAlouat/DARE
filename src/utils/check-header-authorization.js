/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
export function checkHeaderAuthorization(req, res, next) {
  const dontRequiredPaths = ['/', '/login', '/login/'];
  if (dontRequiredPaths.includes(req.path)) {
    if (req.header('Authorization')) {
      res.status(400);
      return res.send({
        error: `400 on ${req.path} because not required Authorization`,
      });
    }

    return next();
  }

  if (req.header('Authorization')) {
    return next();
  }

  res.status(403);
  return res.send({
    error: `403 on ${req.path} because required Authorization`,
  });
}
