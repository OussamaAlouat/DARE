import { getPolices } from '../api';
import { handleError } from '../middlewares/handle-error.middleware';

/* eslint-disable import/prefer-default-export */
const policiesController = async (req, res, next, config) => {
  const token = req.headers.authorization;

  return getPolices(config, token).then((response) => {
    next(response.data);
  })
    .catch((err) => handleError(err, req, res));
};

export { policiesController };
