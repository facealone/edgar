import { Injectable } from '@nestjs/common';
import shortid from 'shortid';
import { ICodeGeneratorAdapter } from 'src/Application/Adapter/ICodeGeneratorAdapter';

@Injectable()
export class CodeGeneratorAdapter implements ICodeGeneratorAdapter {
  generate = () => {
    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );

    return shortid.generate();
  };
}
