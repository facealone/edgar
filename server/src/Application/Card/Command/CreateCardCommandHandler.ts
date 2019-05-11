import { CommandHandler } from '@nestjs/cqrs';
import { CreateCardCommand } from './CreateCardCommand';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { Inject } from '@nestjs/common';
import { CardView } from '../View/CardView';
import { Card } from 'src/Domain/Card/Card.entity';

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
  ) {}

  public execute = async (command: CreateCardCommand): Promise<CardView> => {
    const { name, barCode, user } = command;

    const card = await this.cardRepository.save(
      new Card({
        name,
        barCode,
        user,
      }),
    );

    return new CardView(card.id, card.name, card.barCode);
  };
}
