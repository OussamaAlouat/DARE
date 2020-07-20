/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { isNil } from 'lodash';
import { setExternalToken } from '../utils/token.util';

const tokenCheker = async (req, res, next, config) => {
  if (isNil(config.token)) {
    await setExternalToken(req, res, config);
  }

  next();
};

export { tokenCheker };
