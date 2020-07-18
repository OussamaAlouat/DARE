/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
export function checkHeaderAuthorization(req, res, next) {
  const dontRequiredPaths = ['/', '/login', '/login/'];
  if (dontRequiredPaths.includes(req.path)) {
    //logger.debug(`req.path: ${req.path} not required paths`);
    if (req.header('Authorization')) {
      res.status(400);
      //logger.error(`req.path: ${req.path} not required paths, but has Authorization`);
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
  //logger.error(`req.path: ${req.path} in required paths, and lacks of Authorization`);
  return res.send({
    error: `403 on ${req.path} because required Authorization`,
  });
}
