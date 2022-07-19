import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidationPipe
  implements PipeTransform<string, string | BadRequestException>
{
  transform(value: any) {
    return isValidObjectId(value) ? value : new BadRequestException();
  }
}
