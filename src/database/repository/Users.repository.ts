import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository
} from 'typeorm';
import { Users } from '@database/model/Users.model';
import createHttpError from 'http-errors';
import { identity } from 'lodash';

@EntityRepository(Users)
export class UsersRepo extends Repository<Users> {
  /**
   * @param emailId
   */
  public async findUserByEmailId(emailId: string): Promise<Users> {
    const user = await getRepository(Users).findOne({
      email: emailId.toLowerCase()
    });
    return user;
  }
  

  public async findActiveUserByEmailId(emailId: string): Promise<Users> {
    const user = await getRepository(Users).findOne({
      email: emailId.toLowerCase(),
      accountStatus: true
    });
    return user;
  }
  
  
  public async findUserByMobile(mobile: string): Promise<Users> {
    const user = await getRepository(Users).findOne({
      mobile
    });
    return user;
  }

  public async findUserByEmpId(empId: string): Promise<Users> {
    const user = await getRepository(Users).findOne({
      empId,
      accountStatus: true
    });
    return user;
  }

  public async findUserByUserId(id: string): Promise<any> {
    try {
      const user = await getRepository(Users).findOne({ id });
      return user;
    } catch (err) {
      // throw new createHttpError.InternalServerError(err);
      return err;
    }
  }

  public async activateAccount(data: string): Promise<any> {
    try {
      const user = await getRepository(Users).update(
        { id: data },
        { accountStatus: true, updatedBy: 'Account Verification API' }
      );
      return user;
    } catch (err) {
      // throw new createHttpError.InternalServerError(err);
      return err;
    }
  }

  public async createUser(data: object): Promise<Users> {
    const user = await getRepository(Users).save(data);
    // console.log(user);
    return user;
  }
}
