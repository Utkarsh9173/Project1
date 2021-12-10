import { getManager } from 'typeorm';
// import createError from 'http-errors';
// import { getCustomRepository } from 'typeorm';
// import {
//   AWS_COGNITO_USER_POOL_ID,
//   AWS_COGNITO_REGION,
//   AWS_SECRET_ACCESS_KEY,
//   AWS_ACCESS_KEY,
//   AWS_COGNITO_CLIENT_ID
// } from '@config/secret';
// import {
//   CognitoUserAttribute,
//   CognitoUserPool
// } from 'amazon-cognito-identity-js';
import { UsersRepo } from '@database/repository/Users.repository';
import { UsersProfileRepo } from '@database/repository/UsersProfile.repository';
import { RegisterUser, Login } from '@type/user';
import { UserProfileRegister } from '@type/UserProfile';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import bcrypt = require('bcryptjs');
import { EmailService } from '@service/Email.service';

@Service()
export class UsersService {
  constructor(private emailService: EmailService) {}
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
  public async _checkIfUserExists(user: RegisterUser): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    try {
      let returnValue: any = '';
      let empIdCheck: any;
      let emailDomainCheck: any;
      if (user.accountTypeId === 1 || user.accountTypeId === 2) {
        empIdCheck = await userRepository.findUserByEmpId(user.empId);
        emailDomainCheck =
          user.email.split('@')[1] === 'studiographene.com' ? true : false;
      }
      const mobileCheck = await userRepository.findUserByMobile(user.mobile);
      const emailCheck = await userRepository.findUserByEmailId(user.email);
      if (empIdCheck) {
        returnValue = {
          status: false,
          reason: 'User already registered with this EmployeeID.'
        };
      } else if (!emailDomainCheck) {
        returnValue = {
          status: false,
          reason: 'Please use your Organization EmailID.'
        };
      } else if (mobileCheck) {
        returnValue = {
          status: false,
          reason: 'User already registered with this Mobile Number.'
        };
      } else if (emailCheck) {
        returnValue = {
          status: false,
          reason: 'User already registered with this EmailID.'
        };
      } else {
        returnValue = {
          status: true,
          reason: 'User not available in DB.'
        };
      }
      return returnValue;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async registerUser(user: RegisterUser): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    try {
      let savedUser: any = 'Registeration Un-Successfull';
      user.password = await bcrypt.hashSync(user.password);
      if (
        user.referralCode &&
        user.referralCode !== '' &&
        !user.referralCode !== null
      ) {
        user.isReferred = true;
      }
      const checkIfUserExists = await this._checkIfUserExists(user);
      if (checkIfUserExists.status) {
        savedUser = await userRepository.createUser(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const emailResp = await this.emailService.sendRegistrationEmail(
          savedUser
        );
        // console.log(emailResp);
      } else {
        savedUser = checkIfUserExists.reason;
      }
      // console.log(savedUser);
      return savedUser;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async createUserProfile(response: UserProfileRegister): Promise<any> {
    try {
      // console.log(response);
      const data = {
        empId: response.empId,
        location: response.location,
        department: response.department
      };
      // console.log(data);
      const resp: any = await getManager()
        .getCustomRepository(UsersProfileRepo)
        .insertData(data);
      return resp;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
  public async login(user: Login): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      const activeUser = await userRepository.findActiveUserByEmailId(
        user.email
      );
      //  console.log(activeUser);
      if (activeUser === undefined) {
        response = 'Please register or verify your account';
      } else {
        const dbPassword = await bcrypt.compare(
          user.password,
          activeUser.password
        );
        if (dbPassword) {
          response = 'you have logged in';
        } else {
          response = 'Invalid Credentials';
        }
      }
      // console.log(savedUser);
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
  public async forgotPassword(user: Login): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      const activeUser = await userRepository.findActiveUserByEmailId(
        user.email
      );
      //  console.log(activeUser);
      if (activeUser === undefined) {
        response = 'Please register or verify your account';
      } else {
        
       
          user.password = await bcrypt.hashSync(user.password);
          console.log(user.password);
          
          response = 'Password reset sucessfully';
        
      }
      // console.log(savedUser);
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
}
