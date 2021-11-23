import { Application } from 'express';
import { AuthenticateRequest } from '@middleware/authenticate-request';

import UsersRoute from './Users.route';
import UserRoute from './user.route';

import BaseRoute from './base.route';
import TreesRoute from './trees.route';
// import switchcraftRoute from './switchcraft.route';
export class Routes {
  private authenticate;
  constructor() {
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
  }
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use('/api/users', UsersRoute);
    app.use('/api/auth', BaseRoute);
    app.use('/api/user', UserRoute);
    app.use('/api/moretrees', TreesRoute);
    // app.use('/api/switchcraft', switchcraftRoute);
  }
}
