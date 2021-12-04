import { Application } from 'express';
import { AuthenticateRequest } from '@middleware/authenticate-request';

import UsersRoute from './Users.route';
import ListingsRoute from './Listings.route';

import BaseRoute from './base.route';
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
    app.use('/api/listings', ListingsRoute);
    app.use('/api/auth', BaseRoute);
    // app.use('/api/switchcraft', switchcraftRoute);
  }
}
