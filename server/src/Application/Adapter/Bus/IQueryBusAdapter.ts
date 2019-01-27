import { IQuery } from 'src/Application/IQuery';

export interface IQueryBusAdapter {
  execute(query: IQuery);
}
