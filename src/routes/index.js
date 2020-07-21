import { Router } from 'express';

import { index } from '../controller';
import { policiesController } from '../controller/policies.controller';
import { clientsController } from '../controller/clients.controller';
import { loginController } from '../controller/login.controller';
import {
  sendOkResponse, processDataLimit, searchDataWithId, processDataWithName,
  setDataInRequest, findClientPolicie, notFoundFilter,
} from '../middlewares/responses.middleware';
import { tokenCheker } from '../middlewares/token-checker.middleware';

export default (config) => {
  const routes = Router();

  routes.get('/',
    (req, res, next) => index(req, res, next));

  routes.get('/policies',
    (req, res, next) => tokenCheker(req, res, next, config),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => processDataLimit(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/policies/:id',
    (req, res, next) => tokenCheker(req, res, next, config),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients',
    (req, res, next) => tokenCheker(req, res, next, config),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => processDataWithName(result, req, res, next),
    (result, req, res, next) => processDataLimit(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients/:id',
    (req, res, next) => tokenCheker(req, res, next, config),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients/:id/policies',
    (req, res, next) => tokenCheker(req, res, next, config),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => notFoundFilter(result, req, res, next), // not found client
    (result, req, res, next) => setDataInRequest(result, req, res, next),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => findClientPolicie(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.post('/login',
    (req, res, next) => loginController(req, res, next, config));

  return routes;
};
