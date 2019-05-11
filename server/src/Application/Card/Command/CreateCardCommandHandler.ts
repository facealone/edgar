import { CommandHandler } from '@nestjs/cqrs';
import { CreateCardCommand } from './CreateCardCommand';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { Inject } from '@nestjs/common';
import { CardCreatedView } from '../View/CardCreatedView';
import { Card } from 'src/Domain/Card/Card.entity';

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
  ) {}

  public execute = async (
    command: CreateCardCommand,
  ): Promise<CardCreatedView> => {
    const { name, barCode, user } = command;

    const card = await this.cardRepository.save(
      new Card({
        name,
        barCode,
        user,
      }),
    );

    return new CardCreatedView(card.id, card.name, card.barCode);
  };
}
