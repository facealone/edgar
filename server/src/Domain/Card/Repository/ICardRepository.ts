import { Card } from '../Card.entity';
import { House } from 'src/Domain/House/House.entity';
import { CardFiltersDto } from 'src/Infrastructure/Card/Controller/Dto/CardFiltersDto';

export interface ICardRepository {
  save(card: Card): Promise<Card>;
  findByHouse(house: House, filters: CardFiltersDto): Promise<[Card[], number]>;
  findOneById(id: string): Promise<Card | null>;
  remove(card: Card): void;
}
