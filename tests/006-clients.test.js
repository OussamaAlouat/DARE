import test from 'tape';
import request from 'supertest';
import { isArray } from 'lodash';

import { app, server } from '../src/index';
import configuration from '../src/config';

test('-------- Controller: Get clients ', (assert) => {
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
          .get('/clients')
          .set('Authorization', tokenToSend)
          .expect(statusCodeExpected)
          .then(
            (response) => {
              const data = response.body;
              assert.true(isArray(data), 'Response should be an array');
              assert.true(data.length > 0, 'Response should have clients in the array');
              assert.end();
              server.close();
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

test('-------- Controller: Get clients/:id ', (assert) => {
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
          .get('/clients')
          .set('Authorization', tokenToSend)
          .expect(statusCodeExpected)
          .then(
            (response) => {
              const data = response.body;
              const { id } = data[0];
              request(app)
                .get(`/clients/${id}`)
                .set('Authorization', tokenToSend)
                .expect(statusCodeExpected)
                .then((resp) => {
                  const findedClient = resp.body[0];
                  const message = 'Status should be 200 and should have the expected client';
                  assert.deepEqual(findedClient.id, id, message);
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
