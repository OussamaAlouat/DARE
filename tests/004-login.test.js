import test from 'tape';
import request from 'supertest';
import { app, server } from '../src/index';
import configuration from '../src/config';

test('-------- Controller: POST login ', (assert) => {
  const url = '/login';
  const serverMessage = 'Unauthorized: Invalid password or user';
  const message = `Status must be 401 and message should be ${serverMessage}`;
  const statusCodeExpected = 401;
  const responseExpected = { code: statusCodeExpected, message: serverMessage };
  const payload = { user: 'user', password: '123' };
  request(app)
    .post(url)
    .send(payload)
    .expect(statusCodeExpected)
    .then(
      (res) => {
        assert.deepEqual(res.body, responseExpected, message);
        assert.end();
        server.close();
      }, (err) => {
        assert.fail(err.message);
        assert.end();
        server.close();
      },
    );
});

test('-------- Controller: POST login ', (assert) => {
  const config = configuration(app);
  const url = '/login';
  const message = 'Status must be 200 and shpud contains a token';
  const statusCodeExpected = 200;
  const payload = { user: config.user, password: config.password };

  request(app)
    .post(url)
    .send(payload)
    .expect(statusCodeExpected)
    .then(
      (res) => {
        const { token } = res.body;
        assert.true(token.length > 0, message);
        assert.end();
        server.close();
      }, (err) => {
        assert.fail(err.message);
        assert.end();
        server.close();
      },
    );
});
