import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { CardRepository } from './Repository/CardRepository';
import { Card } from 'src/Domain/Card/Card.entity';
import { CreateCardController } from './Controller/CreateCardController';
import { CreateCardCommandHandler } from 'src/Application/Card/Command/CreateCardCommandHandler';
import { GetCardsByHouseQueryHandler } from 'src/Application/Card/Query/GetCardsByHouseQueryHandler';
import { RemoveCardController } from './Controller/RemoveCardController';
import { RemoveCardCommandHandler } from 'src/Application/Card/Command/RemoveCardCommandHandler';
import { GetCardsController } from './Controller/GetCardsController';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Card, UserHouse])],
  controllers: [GetCardsController, CreateCardController, RemoveCardController],
  providers: [
    { provide: 'ICardRepository', useClass: CardRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    CreateCardCommandHandler,
    GetCardsByHouseQueryHandler,
    IsMemberOfHouse,
    RemoveCardCommandHandler,
  ],
})
export class CardModule {}
