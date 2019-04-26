import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';
import { ICodeGeneratorAdapter } from 'src/Application/Adapter/ICodeGeneratorAdapter';

@Injectable()
export class CodeGeneratorAdapter implements ICodeGeneratorAdapter {
  generate = () => {
    return shortid.generate();
  };
}
