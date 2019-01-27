import { Module } from '@nestjs/common';
import { CreateUserAction } from 'src/Infrastructure/Action/User/CreateUserAction';
import { CreateUserCommandHandler } from 'src/Application/User/Handler/CreateUserCommandHandler';
import { BusModule } from '../Common/BusModule';

@Module({
  imports: [BusModule],
  controllers: [CreateUserAction],
  providers: [CreateUserCommandHandler],
})
export class UserModule {}
