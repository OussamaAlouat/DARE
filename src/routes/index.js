import { Router } from 'express';
import { index } from '../controller';

export default (config) => {
  const routes = Router();

  routes.get('/',
    (req, res, next) => index(req, res, next));

  return routes;
};
