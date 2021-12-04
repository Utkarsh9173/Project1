import { RegistrationEmail } from '@type/Email';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import aws from 'aws-sdk';
import {
  AWS_ACCESS_KEY,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  FROM_EMAIL
} from '@config/secret';

const sesConfig = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  apiVersion: '2010-12-01',
  region: AWS_REGION
};

@Service()
export class EmailService {
  public async sendRegistrationEmail(
    userData: RegistrationEmail
  ): Promise<any> {
    try {
      // console.log(sesConfig);
      const mailOptions = {
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [userData.email]
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `Hello ${userData.firstName},<br/><br/>
              Welcome to Studio Graphene.<br/><br/>

              Click on the link to verify your email and activate your account: <br/><br/><br/> <a href="http://localhost:3001/api/users/verify-account?userAccountId=${userData.id}" target="_blank">http://localhost:3001/api/user/verify-account?userAccountId=${userData.id}</a><br/><br/>
              Thank You<br/>
              SG Job Portal`
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `[Account Activation] Studio Graphene Job Portal`
          }
        }
      };
      // console.log(mailOptions);
      return new aws.SES(sesConfig).sendEmail(mailOptions).promise();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
}
