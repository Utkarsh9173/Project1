import express from 'express';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import { AuthenticateRequest } from '@middleware/authenticate-request';
import Container from 'typedi';
import { TreesController } from '@api/controller/treesController';
import { MoreTreesRepo } from '@database/repository/moretrees.repository';
import { TreesValidator } from '@api/validator/trees.validator';

class TreesRoute {
  public router: express.Router = express.Router();
  private TreesController: TreesController;
  private httpRequestValidator: HttpRequestValidator;

  constructor() {
    this.httpRequestValidator = new HttpRequestValidator();
    this.TreesController = Container.get(TreesController);
    this.assign();
  }

  private assign() {
    this.router.get('/viewCredits', this.TreesController.viewCredits);

    this.router.get('/viewTypes', this.TreesController.viewTypes);

    this.router.get(
      '/plantree',
      // [this.httpRequestValidator.validate("body", TreesValidator.validateCreatePlantTree)],
      this.TreesController.plantTree
    );

    this.router.get('/carbonOffset', this.TreesController.carbonOffset);

    this.router.get(
      '/getUserData/carbonOffset',
      this.TreesController.moreTreesDashboard
    );
  }
}

export default new TreesRoute().router;
