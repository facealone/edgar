import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetHousesByUserQuery } from './GetHousesByUserQuery';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { GetHousesByUserView } from '../View/GetHousesByUserView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetHousesByUserQuery)
export class GetHousesByUserQueryHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  public execute = async (
    query: GetHousesByUserQuery,
  ): Promise<Pagination<GetHousesByUserView>> => {
    const user = query.user;
    const userHousesViews = [];
    const [userHouses, total] = await this.userHouseRepository.findByUser(
      user,
      1,
    );

    for (const userHouse of userHouses) {
      userHousesViews.push(
        new GetHousesByUserView(
          userHouse.house.id,
          userHouse.house.name,
          userHouse.role,
          userHouse.house.id === user.currentHouse.id,
          userHouse.createdAt,
        ),
      );
    }

    return new Pagination<GetHousesByUserView>(userHousesViews, total);
  };
}
