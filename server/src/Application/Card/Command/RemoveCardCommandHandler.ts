import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RemoveCardCommand } from './RemoveCardCommand';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { Card } from 'src/Domain/Card/Card.entity';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';

@CommandHandler(RemoveCardCommand)
export class RemoveCardCommandHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: RemoveCardCommand): Promise<void> => {
    const { id, user } = command;
    const card = await this.cardRepository.findOneById(id);

    if (!(card instanceof Card)) {
      throw new NotFoundException('card.not.found');
    }

    if (
      false === (await this.isMemberOfHouse.isSatisfiedBy(card.house, user))
    ) {
      throw new ForbiddenException();
    }

    this.cardRepository.remove(card);
  };
}
