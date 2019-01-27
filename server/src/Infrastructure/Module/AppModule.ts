import { Module } from '@nestjs/common';
import { UserModule } from './User/UserModule';
import { DatabaseModule } from './Common/DatabaseModule';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
