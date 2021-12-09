import { ResponseParser } from '@util/response-parser';
import { Request, Response } from 'express';
import constant from '@config/constant';
import i18n from 'i18n';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { UsersService } from '@service/Users.service';
import { UsersRepo } from '@database/repository/Users.repository';
import { getManager } from 'typeorm';

@Service()
export class UsersController {
  private responseParser: ResponseParser;

  constructor(private usersService: UsersService) {
    this.responseParser = new ResponseParser();
  }
  public registerUser = async (req: Request, res: Response): Promise<void> => {
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

  public verifyAccount = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      // console.log(req.query);
      const params: any = req.query.userAccountId;
      response = await userRepository.findUserByUserId(params);
      // console.log(typeof response, response);
      if (response) {
        if (response.message) {
          response = response.message;
        } else {
          // console.log(response);
          await userRepository.activateAccount(params);
          response = 'Account verified successfully. Continue to login';
        }
      } else {
        response = 'User not found. Incorrect userAccountId';
      }
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public findEmployee = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      // console.log(req.body.empId);
      response = await userRepository.findUserByEmpId(req.body.empId);
      // console.log(typeof response, response);
      if (!response) {
        response = 'User not found. Incorrect Employee ID';
      }
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public findEmployeeEmailId = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      // console.log(req.body.empId);
      response = await userRepository.findUserByEmailId(req.body.email);
      // console.log(typeof response, response);
      if (!response) {
        response = 'User not found. Incorrect Employee ID';
      }
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public loginAccount = async (req: Request, res: Response): Promise<void> => {
    // const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      // console.log(req.query);
      const params: any = req.body;
      response = await this.usersService.login(params);
      // console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    // const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      // console.log(req.query);
      const params: any = req.body;
      response = await this.usersService.forgotPassword(params);
      // console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };


}
