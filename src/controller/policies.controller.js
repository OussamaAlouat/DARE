import { getPolices } from '../api';
import { processDataUsingLimit } from '../utils/process-data';
import { handleError } from '../utils/handleError';

/* eslint-disable import/prefer-default-export */
const policiesController = async (req, res, next, config) => {
  const token = req.headers.authorization;
  const { limit } = req.query;

  return getPolices(config, token).then((resp) => {
    const processedData = processDataUsingLimit(limit, resp.data);
    return res.json(processedData);
  })
    .catch(handleError(req, res));
};

export { policiesController };
