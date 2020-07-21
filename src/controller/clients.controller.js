import { getClients } from '../api';
import { handleError } from '../middlewares/handle-error.middleware';
import { setExternalToken } from '../utils/token.util';
import constants from '../models/constants.model';
/* eslint-disable import/prefer-default-export */
const clientsController = async (req, res, next, config) => {
  const token = req.headers.authorization;

  return getClients(config, token).then((response) => {
    next(response.data);
  })
    .catch(async (err) => {
      if (err.response && constants.EXTERNAL_API_ERRORS.indexOf(err.response.staus) !== -1) {
        await setExternalToken(req, res, config);
        return clientsController(req, res, next, config);
      }

      return handleError(err, req, res);
    });
};

export { clientsController };
