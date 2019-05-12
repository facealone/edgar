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

  execute = async (
    query: GetHousesByUserQuery,
  ): Promise<GetHousesByUserView[]> => {
    const user = query.user;
    const userHouses = await this.userHouseRepository.findUserHousesByUser(
      user,
    );
    const userHousesviews = [];

    for (const userHouse of userHouses) {
      const { house, role } = userHouse;

      userHousesviews.push(
        new GetHousesByUserView(
          house.id,
          house.name,
          role,
          house.id === user.currentHouse.id,
        ),
      );
    }

    return userHousesviews;
  };
}
