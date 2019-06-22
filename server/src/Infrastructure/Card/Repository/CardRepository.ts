import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/Domain/Card/Card.entity';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(Card) private readonly repository: Repository<Card>,
  ) {}

  public save = async (card: Card): Promise<Card> => {
    return await this.repository.save(card);
  };

  public findByHouse = async (house: House): Promise<Card[]> => {
    return await this.repository.find({
      where: { house },
      relations: ['user'],
      order: { name: 'ASC' },
    });
  };

  public findOneById = async (id: string): Promise<Card | null> => {
    return await this.repository.findOne({
      where: { id },
      relations: ['house'],
    });
  };

  public remove = async (card: Card): Promise<void> => {
    await this.repository.remove(card);
  };
}
