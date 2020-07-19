import { Router } from 'express';

import { index } from '../controller';
import { policiesController } from '../controller/policies.controller';
import { checkHeaderAuthorization } from '../middlewares/check-header-authorization.middleware';
import { clientsController } from '../controller/clients.controller';
import {
  sendOkResponse, processDataLimit, searchDataWithId, processDataWithName,
  setDataInRequest, findClientPolicie, notFoundFilter,
} from '../middlewares/responses.middleware';

export default (config) => {
  const routes = Router();

  routes.get('/',
    (req, res, next) => index(req, res, next));

  routes.get('/policies',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => processDataLimit(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/policies/:id',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => processDataWithName(result, req, res, next),
    (result, req, res, next) => processDataLimit(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients/:id',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  routes.get('/clients/:id/policies',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => clientsController(req, res, next, config),
    (result, req, res, next) => searchDataWithId(result, req, res, next),
    (result, req, res, next) => notFoundFilter(result, req, res, next), // not found client
    (result, req, res, next) => setDataInRequest(result, req, res, next),
    (req, res, next) => policiesController(req, res, next, config),
    (result, req, res, next) => findClientPolicie(result, req, res, next),
    (result, req, res, next) => sendOkResponse(result, req, res, next));

  return routes;
};
