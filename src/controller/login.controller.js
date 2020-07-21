import { handleError } from '../middlewares/handle-error.middleware';
import { getToken } from '../middlewares/auth.middleware';

/* eslint-disable import/prefer-default-export */
const loginController = async (req, res, next, config) => {
  const { user, password } = req.body;

  if (user !== config.user || password !== config.password) {
    const err = Error('Unauthorized: Invalid password or user');
    err.status = 401;
    return handleError(err, req, res);
  }

  const token = await getToken(config);
  next({ token });
};

export { loginController };
