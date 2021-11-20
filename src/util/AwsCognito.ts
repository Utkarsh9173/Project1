import * as AWS from 'aws-sdk';
import { AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_REGION, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY, AWS_COGNITO_CLIENT_ID } from "@config/secret";
import { integer } from 'aws-sdk/clients/cloudfront';
import { commonConst } from './commonConst';
import i18n from "i18n";


export class AwsCognito {
  private cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider;
  constructor() {
    AWS.config.update({ region: AWS_COGNITO_REGION, 'accessKeyId': AWS_ACCESS_KEY, 'secretAccessKey': AWS_SECRET_ACCESS_KEY });
    this.cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  }
  public async getAllUsers(paginationToken: string, recordSize: integer, filter: string, loggedInUserOrganisation: string): Promise<any> {
    const result: any = {};
    try {
      const params: any = {
        "UserPoolId": AWS_COGNITO_USER_POOL_ID,
        "Limit": recordSize,
      };
      if (paginationToken != '') {
        params.PaginationToken = paginationToken;
      }
      params.Filter = 'family_name = "' + loggedInUserOrganisation +'"';
      if (filter != '') {
        params.Filter = 'email = "' + filter + '"';
      }
      await this.cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        if (err) {
          result.error = err;
        }
        else {
          result.data = data;
        }
      }).promise();
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async findUserByEmailId(userEmailId: string): Promise<any> {
    const result: any = {};
    try {
      const params: any = {
        "UserPoolId": AWS_COGNITO_USER_POOL_ID,
        "Filter": 'email = "' + userEmailId + '"',
        AttributesToGet: [
          "email"
        ],
      };
      await this.cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        if (err) {
          result.error = err;
        }
        else {
          result.data = data;
        }
      }).promise();
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async updateUserPassword(loggedInUserId : string, password: string): Promise<any> {
    const result: any = {};
    try {
      const paramsPassword: any = {
        "Password": password,
        'Permanent': true,
        "UserPoolId": AWS_COGNITO_USER_POOL_ID,
        "Username": loggedInUserId
      };
      await this.cognitoidentityserviceprovider.adminSetUserPassword(paramsPassword).promise();
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async removeUser(userId: string, removeType: integer): Promise<any> {
    const result: any = {};
    try {
      const userData = {
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: userId,
      };
      if (removeType == commonConst.disableUser) { // Disable user code
        await this.cognitoidentityserviceprovider.adminDisableUser(userData).promise();
        result.data = (i18n.__("USER_DISABLED"));
      } else if (removeType == commonConst.enableUser) { // Enable user code
        await this.cognitoidentityserviceprovider.adminEnableUser(userData).promise();
        result.data = (i18n.__("USER_ENABLED"));
      } else if (removeType == commonConst.deleteUser) { // Delete user code
        await this.cognitoidentityserviceprovider.adminDeleteUser(userData).promise();
        result.data = (i18n.__("USER_DELETED"));
      }
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async forgotUserPassword(userId: string): Promise<any> {
    let result: any = {};
    try {
      const params = {
        ClientId: AWS_COGNITO_CLIENT_ID, /* required */
        Username: userId, /* required */
      };
      const promise = new Promise((resolve, reject) => {
        this.cognitoidentityserviceprovider.forgotPassword(params, function (err, data) {
          if (err) {
            result.error = err;
            reject(result.error);
          } else {
            result.data = data;
            resolve(result.data);
          }
        });
      });
      result = await promise;
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async confirmUserPassword(userId: string, password: string, confirmationCode: string): Promise<any> {
    let result: any = {};
    try {
      const params = {
        ClientId: AWS_COGNITO_CLIENT_ID, /* required */
        ConfirmationCode: confirmationCode,
        Password: password,
        Username: userId, /* required */
      };
      const promise = new Promise((resolve, reject) => {
        this.cognitoidentityserviceprovider.confirmForgotPassword(params, function (err, data) {
          if (err) {
            result.error = err;
            reject(result.error);
          } else {
            result.data = data;
            resolve(result.data);
          }
        });
      });
      result = await promise;
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async getUserDetail(userId: string): Promise<any> {
    const result: any = {};
    try {
      const userData = {
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: userId,
      };
      const userDataList = await this.cognitoidentityserviceprovider.adminGetUser(userData).promise();
      const userObj: any = {};
      for (const val of userDataList.UserAttributes) {
        userObj[val.Name] = val.Value;
        if(val.Name === "custom:phone_number" || val.Name === "phone_number") {
          const ph_split = val.Value.split("|");
          userObj.phone_prefix = (ph_split[1]) ? ph_split[0] : '';
          userObj.phone = (ph_split[1]) ? ph_split[1] : '';
        }
      }
      userObj.created_at = userDataList.UserCreateDate;
      if (!("picture" in userObj)) {
        userObj.picture = '';
      }
      result.data = userObj;
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  public async updateUser(userId: string, lastName: string, organisation: string ): Promise<any> {
    const result: any = {};
    try {
      const userData = {
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: userId,
      };
      const params = {
        UserAttributes: [ /* required */
          {
            Name: 'custom:last_name', /* required */
            Value: lastName
          },
          {
            Name: 'family_name', /* required */
            Value: organisation
          },
        ],
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: userId
      };
      this.cognitoidentityserviceprovider.adminUpdateUserAttributes(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }
}
