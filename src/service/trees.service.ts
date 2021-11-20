import { getCustomRepository, UpdateResult } from 'typeorm';
import { UserRepo } from '@database/repository/user.repository';
import { MoreTreesRepo } from '@database/repository/moretrees.repository';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import axios from 'axios';
import { MORETREES_API_BASEURL, MORETREES_API_KEY } from '@config/tempConst';
import i18n from 'i18n';
import { User } from '@database/model/user.model';
import { MoreTrees } from '@database/model/moretrees.model';

@Service()
export class TreesService {
  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<User>
   */
  public async viewCredits(): Promise<any> {
    try {
      const response = await axios.get(
        MORETREES_API_BASEURL + '/basic/viewCredits',
        {
          headers: {
            Authorization: MORETREES_API_KEY
          }
        }
      );

      console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async plantTreeViewTypes(): Promise<any> {
    try {
      const response = await axios.get(
        MORETREES_API_BASEURL + '/basic/viewTypes',
        {
          headers: {
            Authorization: MORETREES_API_KEY
          }
        }
      );

      console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async plantTree(kwh: number, userId: string): Promise<any> {
    userId = '7d58c842-3e5b-4a36-8c77-08f15a15f33f';
    const user = await getCustomRepository(UserRepo).findOne({
      id: userId
    });
    if (!user) {
      throw new createHttpError.BadRequest(i18n.__('user_not_exist'));
    }
    const quantity = 1;
    const body = {
      type_slug: 'any_tree',
      request_type: 2,
      users: [
        {
          first_name: user.firstName,
          email: user.email,
          quantity, // multiply kwh...kwh*0.0016...
          sender_name: 'Rainbow Energy'
        }
      ]
    };
    const response = await axios.post(
      MORETREES_API_BASEURL + '/basic/planttree',
      body,
      {
        headers: {
          Authorization: MORETREES_API_KEY
        }
      }
    );
    await getCustomRepository(UserRepo).save({
      id: userId,
      moreTrees: {
        certificateId: response.data.certificateID,
        certificateUrl: response.data.certificateURL,
        totalCarbonOffset: 300 * quantity,
        noOfTrees: quantity
      }
    });
    return 0;
  }

  public async plantTreecarbonOffset(MoreTrees: any): Promise<any> {
    try {
      const body = {};
      const response = await axios
        .get(MORETREES_API_BASEURL + '/basic/carbonOffset', {
          headers: {
            Authorization: MORETREES_API_KEY
          }
        })
        .then((data) => console.log(JSON.stringify(data.data)))
        .catch((data) => console.log(data));
      console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    this.moreTreesDashboard;
  }

  public async moreTreesDashboard(kwh: number, userId: string): Promise<any> {
    // mt data
    const user = await getCustomRepository(UserRepo);
    const userData = await user
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.moretrees', 'moretrees')
      .getOne();
    // findOne(userId);
    if (!user) {
      throw new createHttpError.BadRequest(i18n.__('user_not_exist'));
    }
    const temp = {
      // noOfTrees: userData.moreTrees.noOfTrees,
      // carbonOff: userData.moreTrees.totalCarbonOffset,
      // userredyear: userData.moreTrees.noOfTrees * 300 * 12,
      rainbowOff: ''
    };

    const response = await axios.get(
      MORETREES_API_BASEURL + 'basic/carbonOffset',
      {
        headers: {
          Authorization: MORETREES_API_KEY
        }
      }
    );

    temp.rainbowOff = response.data.totalCarbonOffset;
    return temp;
  }
}
