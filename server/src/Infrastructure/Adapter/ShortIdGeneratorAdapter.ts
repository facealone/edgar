import { Injectable } from '@nestjs/common';
import shortid from 'shortid';
import { IShortIdGeneratorAdapter } from 'src/Application/Adapter/IShortIdGeneratorAdapter';

@Injectable()
export class ShortIdGeneratorAdapter implements IShortIdGeneratorAdapter {
  generate = () => {
    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );

    return shortid.generate();
  };
}
