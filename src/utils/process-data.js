/* eslint-disable no-plusplus */
import { find } from 'lodash';

const processDataUsingLimit = (limit = 10, data) => {
  if (data.length <= limit) {
    return data;
  }

  const processedData = [];

  for (let i = 0; i < limit; i++) {
    processedData.push(data[i]);
  }

  return processedData;
};

const findDataUsingId = (id, data) => find(data, { id });

export { processDataUsingLimit, findDataUsingId };
