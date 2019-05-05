import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { GetUserByIdQueryHandler } from 'src/Application/User/Query/GetUserByIdQueryHandler';
import { GetLoggedUserAction } from './Action/GetLoggedUserAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Domain/User/User.entity';
import { AuthModule } from '../Auth/AuthModule';
import { UserHouseRepository } from './Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { UpdateCurrentHouseComandHandler } from 'src/Application/User/Command/UpdateCurrentHouseCommandHandler';
import { CreateUserHouseCommandHandler } from 'src/Application/User/Command/CreateUserHouseCommandHandler';
import { SwitchCurrentHouseAction } from './Action/SwitchCurrentHouseAction';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UpdateLoggedUserAction } from './Action/UpdateLoggedUserAction';
import { UpdateUserCommandHandler } from 'src/Application/User/Command/UpdateUserCommandHandler';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([User, UserHouse])],
  controllers: [
    GetLoggedUserAction,
    UpdateLoggedUserAction,
    SwitchCurrentHouseAction,
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    GetUserByIdQueryHandler,
    UpdateUserCommandHandler,
    UpdateCurrentHouseComandHandler,
    CreateUserHouseCommandHandler,
    IsMemberOfHouse,
  ],
})
export class UserModule {}
