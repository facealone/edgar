import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { GetUsersByHouseQuery } from './GetUsersByHouseQuery';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { GetUsersByHouseView } from '../View/GetUsersByHouseView';

@QueryHandler(GetUsersByHouseQuery)
export class GetUsersByHouseQueryHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetUsersByHouseQuery,
  ): Promise<GetUsersByHouseView[]> => {
    const { house } = query;

    if (
      false === (await this.isMemberOfHouse.isSatisfiedBy(house, query.user))
    ) {
      throw new ForbiddenException();
    }

    const userHousesviews = [];
    const userHouses = await this.userHouseRepository.findUserHousesByHouse(
      house,
    );

    for (const userHouse of userHouses) {
      const { user, role } = userHouse;

      userHousesviews.push(
        new GetUsersByHouseView(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          role,
        ),
      );
    }

    return userHousesviews;
  };
}
