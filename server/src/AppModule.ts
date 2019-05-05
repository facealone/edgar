import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Infrastructure/User/UserModule';
import { HouseModule } from './Infrastructure/House/HouseModule';
import { AuthModule } from './Infrastructure/Auth/AuthModule';
import { ShopModule } from './Infrastructure/Shop/ShopModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    HouseModule,
    ShopModule,
  ],
})
export class AppModule {}
