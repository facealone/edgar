import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { GetLoggedUserController } from './Controller/GetLoggedUserController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Domain/User/User.entity';
import { AuthModule } from '../Auth/AuthModule';
import { UserHouseRepository } from './Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { ChangeCurrentHouseComandHandler } from 'src/Application/User/Command/ChangeCurrentHouseCommandHandler';
import { CreateUserHouseCommandHandler } from 'src/Application/User/Command/CreateUserHouseCommandHandler';
import { ChangeCurrentHouseController } from './Controller/ChangeCurrentHouseController';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UpdateMeController } from './Controller/UpdateMeController';
import { UpdateUserCommandHandler } from 'src/Application/User/Command/UpdateUserCommandHandler';
import { GetHousesByUserQueryHandler } from 'src/Application/User/Query/GetHousesByUserQueryHandler';
import { GetUsersByHouseQueryHandler } from 'src/Application/User/Query/GetUsersByHouseQueryHandler';
import { GetHouseMembersController } from './Controller/GetHouseMembersController';
import { UpdatePushNotificationTokenController } from './Controller/UpdatePushNotificationTokenController';
import { UpdatePushNotificationTokenCommandHandler } from 'src/Application/User/Command/UpdatePushNotificationTokenCommandHandler';
import { GetUserByApiTokenHandler } from 'src/Application/User/Query/GetUserByApiTokenQueryHandler';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([User, UserHouse])],
  controllers: [
    GetLoggedUserController,
    UpdateMeController,
    ChangeCurrentHouseController,
    GetHouseMembersController,
    UpdatePushNotificationTokenController,
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    UpdateUserCommandHandler,
    ChangeCurrentHouseComandHandler,
    CreateUserHouseCommandHandler,
    IsMemberOfHouse,
    GetHousesByUserQueryHandler,
    GetUsersByHouseQueryHandler,
    GetUserByApiTokenHandler,
    CanUserRegister,
    UpdatePushNotificationTokenCommandHandler,
  ],
})
export class UserModule {}
