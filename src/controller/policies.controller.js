import { getPolices } from '../api';
import { handleError } from '../utils/handle-error';

/* eslint-disable import/prefer-default-export */
const policiesController = async (req, res, next, config) => {
  const token = req.headers.authorization;
  const { limit } = req.query;

  return getPolices(config, token).then((response) => {
    const data = {
      data: response.data,
      limit,
    };

    next(data);
  })
    .catch((err) => handleError(err, req, res));
};

export { policiesController };
