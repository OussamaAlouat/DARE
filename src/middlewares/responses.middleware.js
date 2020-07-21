import { isNil } from 'lodash';
import {
  processDataUsingLimit, findDataUsingName, findDataUsingParameter,
} from '../utils/process-data.util';

const sendOkResponse = (result, req, res) => {
  res.status(200).json(result);
};

const processDataLimit = (result, req, res, next) => {
  const { limit } = req.query;
  const processedData = processDataUsingLimit(limit, result);
  next(processedData);
};

const searchDataWithId = (result, req, res, next) => {
  const { id } = req.params;
  const finded = findDataUsingParameter(id, result, 'id');
  next(finded ? [finded] : finded);
};

const processDataWithName = (result, req, res, next) => {
  const { name } = req.query;

  if (isNil(name)) {
    next(result);
  } else {
    const finded = findDataUsingName(name, result);
    next(finded ? [finded] : finded);
  }
};

const setDataInRequest = (result, req, res, next) => {
  res.result = result;
  next();
};

const findClientPolicie = (result, req, res, next) => {
  const client = res.result[0];
  const policie = findDataUsingParameter(client.id, result, 'clientId');
  next(policie);
};

const notFoundFilter = (result, req, res, next) => {
  if (!result.length > 0) {
    return res.status(404).json({ message: 'Not found', status: 404 });
  }

  next(result);
};

export {
  sendOkResponse,
  processDataLimit,
  searchDataWithId,
  processDataWithName,
  setDataInRequest,
  findClientPolicie,
  notFoundFilter,
};
