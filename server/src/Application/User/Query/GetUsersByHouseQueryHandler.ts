import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { GetUsersByHouseQuery } from './GetUsersByHouseQuery';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { GetUsersByHouseView } from '../View/GetUsersByHouseView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetUsersByHouseQuery)
export class GetUsersByHouseQueryHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetUsersByHouseQuery,
  ): Promise<Pagination<GetUsersByHouseView>> => {
    const { house, filters } = query;

    if (
      false === (await this.isMemberOfHouse.isSatisfiedBy(house, query.user))
    ) {
      throw new ForbiddenException();
    }

    const userHousesviews = [];
    const [userHouses, total] = await this.userHouseRepository.findByHouse(
      house,
      filters,
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

    return new Pagination<GetUsersByHouseView>(userHousesviews, total);
  };
}
