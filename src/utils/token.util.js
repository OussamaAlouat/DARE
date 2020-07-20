/* eslint-disable import/prefer-default-export */
import { login } from '../api';
import { handleError } from '../middlewares/handle-error.middleware';

/* eslint-disable no-param-reassign */
const setExternalToken = async (req, res, config) => {
  const recived = await login(config).catch((err) => handleError(err, req, res));
  config.token = `Bearer ${recived.data.token}`;
};

export { setExternalToken };
