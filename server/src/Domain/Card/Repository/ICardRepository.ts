import { Card } from '../Card.entity';
import { House } from 'src/Domain/House/House.entity';

export interface ICardRepository {
  save(card: Card): Promise<Card>;
  findByHouse(house: House, page: number): Promise<[Card[], number]>;
  findOneById(id: string): Promise<Card | null>;
  remove(card: Card): void;
}
