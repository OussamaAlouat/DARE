import { getClients } from '../api';
import { handleError } from '../utils/handle-error';

/* eslint-disable import/prefer-default-export */
const clientsController = async (req, res, next, config) => {
  const token = req.headers.authorization;

  return getClients(config, token).then((response) => {
    next(response.data);
  })
    .catch((err) => handleError(err, req, res));
};

export { clientsController };
