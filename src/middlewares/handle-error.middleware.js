/* eslint-disable import/prefer-default-export */

const handleError = (err, req, res) => {
  const status = err.status ? err.status : err.response.data.statusCode || 500;
  const errObject = { code: status, message: err.message };

  res.status(status).json(errObject);
};

export { handleError };
