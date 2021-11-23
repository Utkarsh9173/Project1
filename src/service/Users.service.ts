import { getManager } from 'typeorm';
import createError from 'http-errors';
import { getCustomRepository } from 'typeorm';
import {
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_REGION,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY,
  AWS_COGNITO_CLIENT_ID
} from '@config/secret';
import {
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import { UsersRepo } from '@database/repository/Users.repository';
import { errorCodes } from '@config/responseCodes';

import { RegisterUser } from '@type/user';
import { Users } from '@database/model/Users.model';
import createHttpError from 'http-errors';
import { Service } from 'typedi';

@Service()
export class UsersService {
  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<User>
   */
  // public async register(reqParams: any): Promise<any> {
  //   reqParams.email = reqParams.email.toLowerCase();
  //   const userRepo = getManager().getCustomRepository(UsersRepo);

  //   return this._signupUser(reqParams);
  // }

  // public async _signupUser(registerUser: RegisterUser) {
  //   const poolData = {
  //     UserPoolId: AWS_COGNITO_USER_POOL_ID,
  //     ClientId: AWS_COGNITO_CLIENT_ID
  //   };

  //   const userPool = new CognitoUserPool(poolData);
  //   const {
  //     dob,
  //     firstName,
  //     lastName,
  //     phone,
  //     image,
  //     email,
  //     password
  //   }: RegisterUser = registerUser;

  //   const attributeList: CognitoUserAttribute[] = [];
  //   attributeList.push(
  //     new CognitoUserAttribute({ Name: 'email', Value: email })
  //   );
  //   attributeList.push(
  //     new CognitoUserAttribute({
  //       Name: 'name',
  //       Value: firstName ? firstName : ' '
  //     })
  //   );

  //   return new Promise((resolve, reject) => {
  //     return userPool.signUp(
  //       email,
  //       password,
  //       attributeList,
  //       null,
  //       (err: any, result) => {
  //         if (!result) {
  //           const errMsg =
  //             err.code === 'UsernameExistsException'
  //               ? errorCodes.USER_ALREADY_EXIST
  //               : errorCodes.NOT_ABLE_TO_SIGNUP;
  //           reject(new createError.BadRequest(errMsg));
  //         } else {
  //           resolve(result.user);
  //         }
  //       }
  //     );
  //   });
  // }

  public async registerUser(user: RegisterUser): Promise<Users> {
    try {
      const userRepository = getManager().getCustomRepository(UsersRepo);
      const savedUser = await userRepository.createUser(user);
      console.log(savedUser);
      return savedUser;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
}
