import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { CardView } from '../View/CardView';
import { GetCardsByHouseQuery } from './GetCardsByHouseQuery';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetCardsByHouseQuery)
export class GetCardsByHouseQueryHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetCardsByHouseQuery,
  ): Promise<Pagination<CardView>> => {
    const { user, filters } = query;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const [cards, total] = await this.cardRepository.findByHouse(
      house,
      filters,
    );
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

    return new Pagination<CardView>(cardViews, total);
  };
}
