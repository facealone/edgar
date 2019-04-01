import { Module } from '@nestjs/common';
import { CreateUserCommandHandler } from 'src/Application/User/Command/CreateUserCommandHandler';
import { BusModule } from '../../Common/Module/BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { CreateUserAction } from 'src/Infrastructure/User/Action/CreateUserAction';
import { GetUserByIdQueryHandler } from 'src/Application/User/Query/GetUserByIdQueryHandler';
import { GetUserAction } from '../Action/GetUserAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Domain/User/User.entity';
import { CanUserCreateAccount } from 'src/Domain/User/CanUserCreateAccount';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([User])],
  controllers: [CreateUserAction, GetUserAction],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    CreateUserCommandHandler,
    CanUserCreateAccount,
    GetUserByIdQueryHandler,
  ],
})
export class UserModule {}
