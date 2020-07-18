/* eslint-disable import/prefer-default-export */
const index = (req, res) => {
  const response = { message: 'Server up!!' };
  return res.json(response);
};

export { index };
