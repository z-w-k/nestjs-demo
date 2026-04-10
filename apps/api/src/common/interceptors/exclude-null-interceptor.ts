import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ExcludeNullInterceptor');
    return next.handle().pipe(
      map((value: any): any => {
        console.log('emit ExcludeNullInterceptor', value);
        return value === null ? '' : value;
      }),
    );
  }
}
