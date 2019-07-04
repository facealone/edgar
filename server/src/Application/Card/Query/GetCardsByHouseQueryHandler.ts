import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { CardView } from '../View/CardView';
import { GetCardsByHouseQuery } from './GetCardsByHouseQuery';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';

@QueryHandler(GetCardsByHouseQuery)
export class GetCardsByHouseQueryHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (query: GetCardsByHouseQuery): Promise<CardView[]> => {
    const { user } = query;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const cards = await this.cardRepository.findByHouse(house);
    const cardViews = [];

    for (const card of cards) {
      cardViews.push(
        new CardView(
          card.id,
          card.name,
          card.barCode,
          new OwnerView(card.user.firstName, card.user.lastName),
        ),
      );
    }

    return cardViews;
  };
}
