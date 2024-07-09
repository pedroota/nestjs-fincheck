import { PipeTransform, BadRequestException } from '@nestjs/common';

export class OptionalParseEnumPipe<T extends Record<string, any>>
  implements PipeTransform
{
  constructor(private readonly enumType: T) {}

  async transform(value: any): Promise<any> {
    if (typeof value === 'undefined' || value === null) {
      return undefined;
    }

    if (!Object.values(this.enumType).includes(value)) {
      throw new BadRequestException(
        `Validation failed (enum value is expected) should be one of ${Object.values(this.enumType)}`,
      );
    }

    return value;
  }
}
