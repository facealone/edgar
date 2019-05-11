import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RemoveCardCommand } from './RemoveCardCommand';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { Card } from 'src/Domain/Card/Card.entity';

@CommandHandler(RemoveCardCommand)
export class RemoveCardCommandHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
  ) {}

  public execute = async (command: RemoveCardCommand): Promise<void> => {
    const card = await this.cardRepository.findOneById(command.id);

    if (!(card instanceof Card)) {
      throw new NotFoundException('card.not.found');
    }

    if (card.user.id !== command.user.id) {
      throw new ForbiddenException();
    }

    await this.cardRepository.remove(card);
  };
}
