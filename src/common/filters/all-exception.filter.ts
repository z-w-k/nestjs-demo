import { Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
@Injectable()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('AllExceptionsFilter executed');
    super.catch(exception, host);
  }
}
