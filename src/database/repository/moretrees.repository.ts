import { EntityRepository, getConnection, Repository } from 'typeorm';
import { MoreTrees } from '@database/model/moretrees.model';
import { moreTrees } from '@config/moreTreesConstant';
// import { UserRepo } from '@database/repository/user.repository';
import { number } from '@hapi/joi';
import { User } from '@database/model/user.model';
@EntityRepository(MoreTrees)
export class MoreTreesRepo extends Repository<MoreTrees> {
    public async findUserByEmailId(id: string): Promise<User> {
        return await getConnection()
            .createQueryBuilder(User, 'user')
            .where('LOWER(email) = LOWER(:emailId)', { id })
            .getOne();
    }
}
