import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Infrastructure/User/UserModule';
import { HouseModule } from './Infrastructure/HouseModule';
import { AuthModule } from './Infrastructure/Auth/AuthModule';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, HouseModule],
})
export class AppModule {}
