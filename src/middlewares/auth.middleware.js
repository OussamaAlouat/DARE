import jwt from 'jsonwebtoken';

const getToken = async (config) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour of expiration
  data: { user: config.user, password: config.password },
}, config.secretToken);

const decodeToken = async (token, secret) => jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    return err;
  }

  return decoded;
});

export { getToken, decodeToken };
