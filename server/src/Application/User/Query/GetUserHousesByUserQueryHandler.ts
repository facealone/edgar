import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserHousesByUserQuery } from './GetUserHousesByUserQuery';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { GetUserHousesByUserView } from '../View/GetUserHousesByUserView';

@QueryHandler(GetUserHousesByUserQuery)
export class GetUserHousesByUserQueryHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  execute = async (
    query: GetUserHousesByUserQuery,
  ): Promise<GetUserHousesByUserView[]> => {
    const user = query.user;
    const userHouses = await this.userHouseRepository.findUserHousesByUser(
      user,
    );
    const userHousesviews = [];

    for (const userHouse of userHouses) {
      const { house } = userHouse;

      userHousesviews.push(
        new GetUserHousesByUserView(
          house.id,
          house.name,
          house.id === user.currentHouse.id,
        ),
      );
    }

    return userHousesviews;
  };
}
