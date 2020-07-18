import { Router } from 'express';
import { index } from '../controller';
import { policiesController } from '../controller/policies.controller';
import { checkHeaderAuthorization } from '../utils/check-header-authorization';

export default (config) => {
  const routes = Router();

  routes.get('/',
    (req, res, next) => index(req, res, next));
  routes.get('/policies',
    (req, res, next) => checkHeaderAuthorization(req, res, next),
    (req, res, next) => policiesController(req, res, next, config));

  return routes;
};
