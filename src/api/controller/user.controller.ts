import { ResponseParser } from '@util/response-parser';
import { Request, Response } from 'express';
import constant from '@config/constant';
import i18n from 'i18n';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { UserService } from '@service/user.service';

@Service()
export class UserController {
    private responseParser: ResponseParser;

    constructor(private userService: UserService) {
        this.responseParser = new ResponseParser();
    }
    public registerUser = async (req: Request, res: Response) => {
        let response;
        try {
            response = await this.userService.registerUser(req.body);
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
