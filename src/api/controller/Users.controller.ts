import { ResponseParser } from '@util/response-parser';
import { Request, Response } from 'express';
import constant from '@config/constant';
import i18n from 'i18n';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { UsersService } from '@service/Users.service';

@Service()
export class UsersController {
  private responseParser: ResponseParser;

  constructor(private usersService: UsersService) {
    this.responseParser = new ResponseParser();
  }
  public registerUser = async (req: Request, res: Response) => {
    let response;
    try {
      response = await this.usersService.registerUser(req.body);
      if (response.accountTypeId === 1 || response.accountTypeId === 2) {
        await this.usersService.createUserProfile(response);
      }
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };
}
