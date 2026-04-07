import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimeoutInterceptor');
    return next.handle().pipe(
      timeout(3000),
      catchError((err: Error) => {
        if (err instanceof TimeoutError) {
          console.log('TimeoutInterceptor TimeoutError');
          return throwError(() => new RequestTimeoutException());
        }
        console.log('TimeoutInterceptor other error');
        return throwError(() => err);
      }),
    );
  }
}
