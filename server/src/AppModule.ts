import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Infrastructure/User/UserModule';
import { HouseModule } from './Infrastructure/House/HouseModule';
import { AuthModule } from './Infrastructure/Auth/AuthModule';
import { ShopModule } from './Infrastructure/Shop/ShopModule';
import { CardModule } from './Infrastructure/Card/CardModule';
import { RecipeModule } from './Infrastructure/Recipe/RecipeModule';
import { BudgetModule } from './Infrastructure/Budget/BudgetModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BudgetModule,
    CardModule,
    HouseModule,
    RecipeModule,
    ShopModule,
    UserModule,
  ],
})
export class AppModule {}
