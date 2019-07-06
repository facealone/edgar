import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/Domain/Card/Card.entity';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { House } from 'src/Domain/House/House.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { CardFiltersDto } from '../Controller/Dto/CardFiltersDto';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>,
  ) {}

  public save = async (card: Card): Promise<Card> => {
    return await this.repository.save(card);
  };

  public findByHouse = async (
    house: House,
    filters: CardFiltersDto,
  ): Promise<[Card[], number]> => {
    return await this.repository
      .createQueryBuilder('card')
      .select([
        'card.id',
        'card.name',
        'card.barCode',
        'user.firstName',
        'user.lastName',
      ])
      .where('card.house = :id', { id: house.id })
      .innerJoin('card.user', 'user')
      .orderBy('card.name', 'ASC')
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };

  public findOneById = async (id: string): Promise<Card | null> => {
    return await this.repository
      .createQueryBuilder('card')
      .select(['card.id', 'house.id'])
      .where('card.id = :id', { id })
      .innerJoin('card.house', 'house')
      .getOne();
  };

  public remove = (card: Card): void => {
    this.repository.remove(card);
  };
}
