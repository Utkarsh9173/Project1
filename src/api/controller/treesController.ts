import { ResponseParser } from '@util/response-parser';
import { request, Request, response, Response } from 'express';
import constant from '@config/constant';
import i18n from 'i18n';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { TreesService } from '@service/trees.service';
import { moreTrees } from '@config/moreTreesConstant';

@Service()
export class TreesController {
  private responseParser: ResponseParser;

  constructor(private treesService: TreesService) {
    this.responseParser = new ResponseParser();
  }
  public viewCredits = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const response = await this.treesService.viewCredits();
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS_PLANT_TREE_VIEW_CREDITS'))
      .send(res);
  };

  public viewTypes = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const response = await this.treesService.plantTreeViewTypes();
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS_PLANT_TREE_VIEW_TYPES'))
      .send(res);
  };

  public plantTree = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const response = await this.treesService.plantTree(1, 's');
    return this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS_PLANT_TREE'))
      .send(res);
  };

  public carbonOffset = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const response = await this.treesService.plantTreecarbonOffset(
      req.body.MoreTrees
    );
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS_PLANT_TREE_CARBON_OFFSET'))
      .send(res);
  };

  public moreTreesDashboard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { body } = req;
    const response = await this.treesService.moreTreesDashboard(
      req.body.kwh,
      req.body.userId
    );
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS_PLANT_TREE_USERDATA_CARBON_OFFSET'))
      .send(res);
  };
}
