import { Card } from '../Card.entity';

export interface ICardRepository {
  save(card: Card): Promise<Card>;
}
