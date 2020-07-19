import { processDataUsingLimit } from "./process-data";

const sendOkResponse = (result, req, res) => {
  res.status(200).json(result);
};

const processDataLimit = (result, req, res, next) => {
  const { data, limit } = result;
  const processedData = processDataUsingLimit(limit, data);
  next(processedData);
};

export { sendOkResponse, processDataLimit };
