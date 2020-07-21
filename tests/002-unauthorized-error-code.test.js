import test from 'tape';
import request from 'supertest';
import { app, server } from '../src/index';

test('-------- Controller: GET /policies', (assert) => {
  const url = '/policies';
  const message = 'Status must be 401';
  const responseExpected = { code: 401, message: 'Unauthorized, is required Authorization header' };
  const statusCodeExpected = 401;
  request(app)
    .get(url)
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

test('-------- Controller: GET /clients', (assert) => {
  const url = '/clients';
  const message = 'Status must be 401';
  const responseExpected = { code: 401, message: 'Unauthorized, is required Authorization header' };
  const statusCodeExpected = 401;
  request(app)
    .get(url)
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
