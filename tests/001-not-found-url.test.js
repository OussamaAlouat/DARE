import test from 'tape';
import request from 'supertest';
import { app, server } from '../src/index';

test('-------- Controller: GET /', (assert) => {
  const url = '/not-found';
  const message = 'Status must be 404';
  const responseExpected = { code: 404, message: 'Not Found' };
  const statusCodeExpected = 404;
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
