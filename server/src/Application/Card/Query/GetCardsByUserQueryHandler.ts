import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCardsByUserQuery } from './GetCardsByUserQuery';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { CardView } from '../View/CardView';
import { CardListView } from '../View/CardListView';

@QueryHandler(GetCardsByUserQuery)
export class GetCardsByUserQueryHandler {
  constructor(
    @Inject('ICardRepository')
    private readonly cardRepository: ICardRepository,
  ) {}

  public execute = async (
    query: GetCardsByUserQuery,
  ): Promise<CardListView> => {
    const cards = await this.cardRepository.findByUser(query.user);
    const cardViews = [];

    for (const card of cards) {
      cardViews.push(new CardView(card.id, card.name, card.barCode));
    }

    return new CardListView(cardViews);
  };
}
