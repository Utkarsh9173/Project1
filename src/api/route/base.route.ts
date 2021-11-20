import express from 'express';
import { AuthController } from '@api/controller/authController';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import { login, register } from '@api/validator/base.validator';
import { AuthenticateRequest } from '@middleware/authenticate-request';

class BaseRoute {
  public router: express.Router = express.Router();
  private authController: AuthController;
  private httpRequestValidator: HttpRequestValidator;
  private authenticate;

  constructor() {
    this.authController = new AuthController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.assign();
  }

  private assign() {
    this.router.post(
      '/register',
      this.httpRequestValidator.validate('body', register),
      this.authController.register
    );

    this.router.get('/', this.authController.defaultCheck);
  }
}

export default new BaseRoute().router;
