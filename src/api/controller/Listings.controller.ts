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
export class ListingsController {
  private responseParser: ResponseParser;

  constructor(private usersService: UsersService) {
    this.responseParser = new ResponseParser();
  }
}
