import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/Domain/Card/Card.entity';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';
import { User } from 'src/Domain/User/User.entity';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(Card) private readonly repository: Repository<Card>,
  ) {}

  public save = async (card: Card): Promise<Card> => {
    return await this.repository.save(card);
  };

  public findByUser = async (user: User): Promise<Card[]> => {
    return await this.repository.find({
      where: { user },
      order: { name: 'ASC' },
    });
  };
}
