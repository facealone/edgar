import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Infrastructure/User/UserModule';
import { HouseModule } from './Infrastructure/House/HouseModule';
import { AuthModule } from './Infrastructure/Auth/AuthModule';
import { ShopModule } from './Infrastructure/Shop/ShopModule';
import { CardModule } from './Infrastructure/Card/CardModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    CardModule,
    HouseModule,
    ShopModule,
    UserModule,
  ],
})
export class AppModule {}
