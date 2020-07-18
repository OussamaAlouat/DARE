import test from 'tape';
import request from 'supertest';
import { app, server } from '../src/index';

test('-------- Controller: GET /', (assert) => {
  const url = '/';
  const serverMessage = 'Server up!!';
  const message = `Status must be 200 and message should be ${serverMessage}`;
  const responseExpected = { message: serverMessage };
  const statusCodeExpected = 200;
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
