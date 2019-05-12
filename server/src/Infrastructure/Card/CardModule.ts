import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { CardRepository } from './Repository/CardRepository';
import { Card } from 'src/Domain/Card/Card.entity';
import { CreateCardController } from './Controller/CreateCardController';
import { CreateCardCommandHandler } from 'src/Application/Card/Command/CreateCardCommandHandler';
import { GetCardsByUserQueryHandler } from 'src/Application/Card/Query/GetCardsByUserQueryHandler';
import { RemoveCardController } from './Controller/RemoveCardController';
import { RemoveCardCommandHandler } from 'src/Application/Card/Command/RemoveCardCommandHandler';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Card])],
  controllers: [CreateCardController, RemoveCardController],
  providers: [
    { provide: 'ICardRepository', useClass: CardRepository },
    CreateCardCommandHandler,
    GetCardsByUserQueryHandler,
    RemoveCardCommandHandler,
  ],
})
export class CardModule {}
