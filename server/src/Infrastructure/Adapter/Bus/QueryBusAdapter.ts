import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { IQuery } from 'src/Application/IQuery';

@Injectable()
export class QueryBusAdapter implements IQueryBusAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  public execute = (query: IQuery) => {
    return this.queryBus.execute(query);
  };
}
