import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';
import { ICodeGeneratorAdapter } from 'src/Application/Adapter/ICodeGeneratorAdapter';

@Injectable()
export class CodeGeneratorAdapter implements ICodeGeneratorAdapter {
  public generate = () => {
    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyz$@ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );

    return shortid.generate();
  };
}
