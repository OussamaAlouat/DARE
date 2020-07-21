/* eslint-disable import/prefer-default-export */

import { getPolices } from '../api';
import { handleError } from '../middlewares/handle-error.middleware';
import { setExternalToken } from '../utils/token.util';
import constants from '../models/constants.model';

const policiesController = async (req, res, next, config) => {
  getPolices(config, config.token).then((response) => {
    next(response.data);
  }).catch(async (err) => {
    if (err.response && constants.EXTERNAL_API_ERRORS.indexOf(err.response.staus) !== -1) {
      await setExternalToken(req, res, config);
      return policiesController(req, res, next, config);
    }

    return handleError(err, req, res);
  });
};

export { policiesController };
