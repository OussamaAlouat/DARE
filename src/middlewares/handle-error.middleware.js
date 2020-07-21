/* eslint-disable import/prefer-default-export */

const handleError = (err, req, res) => {
  let status = 500;

  if (err.status || err.response) {
    status = err.status ? err.status : err.response.status;
  }

  const errObject = { code: status, message: err.message };

  res.status(status).json(errObject);
};

export { handleError };
