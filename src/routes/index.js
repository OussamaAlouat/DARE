import { Router } from 'express';
import { index } from '../controller';
import { policiesController } from '../controller/policies.controller';
import { checkHeaderAuthorization } from '../utils/check-header-authorization';
import { sendOkResponse, processDataLimit, searchDataWithId, processDataWithName } from '../utils/responses.util';
import { clientsController } from '../controller/clients.controller';

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

  return routes;
};
