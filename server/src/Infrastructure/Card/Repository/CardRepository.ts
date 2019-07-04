import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/Domain/Card/Card.entity';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>,
  ) {}

  public save = async (card: Card): Promise<Card> => {
    return await this.repository.save(card);
  };

  public findByHouse = async (house: House): Promise<Card[]> => {
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
      .orderBy('name', 'ASC')
      .limit(20)
      .getMany();
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
