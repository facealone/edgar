import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/Domain/Card/Card.entity';
import { ICardRepository } from 'src/Domain/Card/Repository/ICardRepository';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(Card) private readonly repository: Repository<Card>,
  ) {}

  public save = async (card: Card): Promise<Card> => {
    return await this.repository.save(card);
  };
}
