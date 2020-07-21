import { decodeToken } from './auth.middleware';

const verifyToken = async (req, res, next, config) => {
  const token = req.header('Authorization').split(' ')[1];
  const decoded = await decodeToken(token, config.secretToken);
  if (
    decoded.data && decoded.data.user === config.user && decoded.data.password === config.password
  ) {
    return next();
  }

  return res.status(401).send({ message: 'Invalid token', code: 401 });
};
export { verifyToken };
