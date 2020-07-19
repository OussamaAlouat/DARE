import { isNil } from 'lodash';
import {
  processDataUsingLimit, findDataUsingName, findDataUsingParameter,
} from './process-data';

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
  next(finded);
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

export {
  sendOkResponse,
  processDataLimit,
  searchDataWithId,
  processDataWithName,
};
