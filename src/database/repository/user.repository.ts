import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { User } from '@database/model/user.model';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  /**
   * @param emailId
   */
  public async findUserByEmailId(emailId: string): Promise<User> {
    const user = await getRepository(User).findOne({
      email: emailId.toLowerCase(),
    });
    return user;
  }
}
