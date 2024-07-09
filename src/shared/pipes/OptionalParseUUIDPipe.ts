import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform {
  async transform(value: string): Promise<string | undefined> {
    if (typeof value === 'undefined' || value === null) {
      return undefined;
    }

    if (!isUUID(value)) {
      throw new BadRequestException('Validation failed (uuid  is expected)');
    }

    return value;
  }
}
