import { Request, Response } from 'express';
import i18n from 'i18n';
import { ResponseParser } from '@util/response-parser';
import constant from '@config/constant';
import { UserService } from '@service/user.service';

export class AuthController {
  private responseParser: ResponseParser;
  private userService: UserService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.userService = new UserService();
  }

  public defaultCheck = (req: Request, res: Response): void => {
    this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody({})
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  // /**
  //  * @param  {Request} req
  //  * @param  {Response} res
  //  * @returns void
  //  */
  // public login = async (req: Request, res: Response): Promise<void> => {
  //   const {
  //     body: { email, password }
  //   } = req;
  //   const response = await this.userService.login(email, password);
  //   this.responseParser
  //     .setStatus(true)
  //     .setHttpCode(constant.HTTP_STATUS_OK)
  //     .setBody(response)
  //     .setMessage(i18n.__("login_successful"))
  //     .send(res);
  // };

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
  // public register = async (req: Request, res: Response): Promise<void> => {
  //   const { body }= req;
  //   const response = await this.userService.register(body);
  //   this.responseParser
  //     .setStatus(true)
  //     .setHttpCode(constant.HTTP_STATUS_CREATED)
  //     .setBody(response)
  //     .setMessage(i18n.__("signup_successful"))
  //     .send(res);
  // };

  // public verifyUserEmail = async(req: Request, res: Response): Promise<void> => {
  //   const { params: { uniqueKey } } = req;
  //       const response = await this.userService.verifyRegisteredUserEmail(
  //         uniqueKey.toString()
  //       );
  //       this.responseParser
  //         .setStatus(true)
  //         .setHttpCode(constant.HTTP_STATUS_OK)
  //         .setBody(response)
  //         .setMessage(i18n.__("email_verified"))
  //         .send(res);
  //     };
}
