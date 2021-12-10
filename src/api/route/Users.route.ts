import express from 'express';
import Container from 'typedi';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import { UsersController } from '@api/controller/Users.controller';
class UsersRoute {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;
  private usersController: UsersController;
  constructor() {
    this.httpRequestValidator = new HttpRequestValidator();
    this.usersController = Container.get(UsersController);
    this.assign();
  }
  private assign() {
    this.router.post(
      '/register',
      // this.httpRequestValidator.validate('body', RegisterUser),
      this.usersController.registerUser
    );
    this.router.get('/verify-account', this.usersController.verifyAccount);
    this.router.get('/find-employee', this.usersController.findEmployee);
    this.router.post('/login', this.usersController.loginAccount);
    this.router.post('/forgotPassword', this.usersController.forgotPassword);
  }
}

export default new UsersRoute().router;
