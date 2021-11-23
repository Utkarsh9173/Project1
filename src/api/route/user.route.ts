import express from 'express';
import { RegisterUser } from '@api/validator/user.validator';
import Container from 'typedi';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import { UserController } from '@api/controller/user.controller';
class UserRoute {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;
  private userController: UserController;
  constructor() {
    this.httpRequestValidator = new HttpRequestValidator();
    this.userController = Container.get(UserController);
    this.assign();
  }
  private assign() {
    // this.router.post(
    //     '/register',
    //     // this.httpRequestValidator.validate('body', RegisterUser),
    //     this.userController.registerUser
    // );
  }
}

export default new UserRoute().router;
