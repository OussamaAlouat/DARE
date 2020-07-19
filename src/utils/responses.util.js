import { processDataUsingLimit, findDataUsingId } from "./process-data";

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
  const finded = findDataUsingId(id, result);
  next(finded);
};

export { sendOkResponse, processDataLimit, searchDataWithId };
