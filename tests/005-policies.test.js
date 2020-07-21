import test from 'tape';
import request from 'supertest';
import { isArray } from 'lodash';

import { app, server } from '../src/index';
import configuration from '../src/config';

test('-------- Controller: Get policies ', (assert) => {
  const config = configuration(app);
  const url = '/login';
  const statusCodeExpected = 200;
  const payload = { user: config.user, password: config.password };

  request(app)
    .post(url)
    .send(payload)
    .expect(statusCodeExpected)
    .then(
      (res) => {
        const { token } = res.body;
        const tokenToSend = `Bearer ${token}`;

        request(app)
          .get('/policies')
          .set('Authorization', tokenToSend)
          .expect(statusCodeExpected)
          .then(
            (response) => {
              const data = response.body;
              assert.true(isArray(data), 'Response should be an array');
              assert.true(data.length > 0, 'Response should have policies in the array');
              assert.end();
            }, (err) => {
              assert.fail(err.message);
              assert.end();
              server.close();
            },
          );
      }, (err) => {
        assert.fail(err.message);
        assert.end();
        server.close();
      },
    );
});

test('-------- Controller: Get policies/:id ', (assert) => {
  const config = configuration(app);
  const url = '/login';
  const statusCodeExpected = 200;
  const payload = { user: config.user, password: config.password };

  request(app)
    .post(url)
    .send(payload)
    .expect(statusCodeExpected)
    .then(
      (res) => {
        const { token } = res.body;
        const tokenToSend = `Bearer ${token}`;

        request(app)
          .get('/policies')
          .set('Authorization', tokenToSend)
          .expect(statusCodeExpected)
          .then(
            (response) => {
              const data = response.body;
              const { id } = data[0];
              request(app)
                .get(`/policies/${id}`)
                .set('Authorization', tokenToSend)
                .expect(statusCodeExpected)
                .then((resp) => {
                  const finded = resp.body[0];
                  assert.equal(finded.id, id, 'Status should be 200 and id should be the same');
                  assert.end();
                  server.close();
                }, (err) => {
                  assert.fail(err.message);
                  assert.end();
                  server.close();
                });
            }, (err) => {
              assert.fail(err.message);
              assert.end();
              server.close();
            },
          );
      }, (err) => {
        assert.fail(err.message);
        assert.end();
        server.close();
      },
    );
});
