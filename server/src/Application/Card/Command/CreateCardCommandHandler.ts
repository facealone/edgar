import { CommandHandler } from '@nestjs/cqrs';
import { CreateCardCommand } from './CreateCardCommand';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { CardView } from '../View/CardView';
import { Card } from 'src/Domain/Card/Card.entity';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: CreateCardCommand): Promise<CardView> => {
    const { name, barCode, user } = command;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const card = await this.cardRepository.save(
      new Card({
        name,
        barCode,
        user,
        house,
      }),
    );

    return new CardView(
      card.id,
      card.name,
      card.barCode,
      new OwnerView(user.firstName, user.lastName),
    );
  };
}
