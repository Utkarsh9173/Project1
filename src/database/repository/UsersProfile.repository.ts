import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository
} from 'typeorm';
import { UsersProfile } from '@database/model/UsersProfile.model';

@EntityRepository(UsersProfile)
export class UsersProfileRepo extends Repository<UsersProfile> {
  /**
   * @param emailId
   */
  // public async findUserByEmailId(emailId: string): Promise<Users> {
  //   const user = await getRepository(Users).findOne({
  //     email: emailId.toLowerCase()
  //   });
  //   return user;
  // }

  // public async findUserByMobile(mobile: string): Promise<Users> {
  //   const user = await getRepository(Users).findOne({
  //     mobile
  //   });
  //   return user;
  // }

  // public async findUserByEmpId(empId: string): Promise<Users> {
  //   const user = await getRepository(Users).findOne({ empId });
  //   return user;
  // }

  public async insertData(data: object): Promise<UsersProfile> {
    const user = await getRepository(UsersProfile).save(data);
    // console.log(user);
    return user;
  }
}
