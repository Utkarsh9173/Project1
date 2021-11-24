import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository
} from 'typeorm';
import { Users } from '@database/model/Users.model';

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

  public async findUserByMobile(mobile: string): Promise<Users> {
    const user = await getRepository(Users).findOne({
      mobile
    });
    return user;
  }

  public async findUserByEmpId(empId: string): Promise<Users> {
    const user = await getRepository(Users).findOne({ empId });
    return user;
  }

  public async createUser(data: object): Promise<Users> {
    const user = await getRepository(Users).save(data);
    // console.log(user);
    return user;
  }
}
