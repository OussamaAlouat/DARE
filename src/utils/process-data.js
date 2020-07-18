/* eslint-disable no-plusplus */
const processDataUsingLimit = (limit = 10, data) => {
  const processedData = [];

  for (let i = 0; i < limit; i++) {
    processedData.push(data[i]);
  }

  return processedData;
};

export { processDataUsingLimit };
