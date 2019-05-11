import { Card } from '../Card.entity';
import { User } from 'src/Domain/User/User.entity';

export interface ICardRepository {
  save(card: Card): Promise<Card>;
  findByUser(user: User): Promise<Card[]>;
}
