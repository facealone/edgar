import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Infrastructure/User/Module/UserModule';
import { HouseModule } from './Infrastructure/House/Module/HouseModule';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, HouseModule],
})
export class AppModule {}
