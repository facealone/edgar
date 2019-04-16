import { Module } from '@nestjs/common';
import { BusModule } from '../Common/BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { GetUserByIdQueryHandler } from 'src/Application/User/Query/GetUserByIdQueryHandler';
import { GetUserAction } from './Action/GetUserAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Domain/User/User.entity';
import { AuthModule } from '../Auth/AuthModule';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [GetUserAction],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    GetUserByIdQueryHandler,
  ],
})
export class UserModule {}
