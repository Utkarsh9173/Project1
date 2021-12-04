import express from 'express';
import Container from 'typedi';
import { UsersController } from '@api/controller/Users.controller';
class ListingsRoute {
  public router: express.Router = express.Router();
  private usersController: UsersController;
  constructor() {
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
  }
}

export default new ListingsRoute().router;
