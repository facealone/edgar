import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetHousesByUserQuery } from './GetHousesByUserQuery';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { GetHousesByUserView } from '../View/GetHousesByUserView';

@QueryHandler(GetHousesByUserQuery)
export class GetHousesByUserQueryHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  public execute = async (
    query: GetHousesByUserQuery,
  ): Promise<GetHousesByUserView[]> => {
    const user = query.user;
    const userHouses = await this.userHouseRepository.findUserHousesByUser(
      user,
    );
    const userHousesViews = [];

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

    return userHousesViews;
  };
}
