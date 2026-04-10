import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('CacheInterceptor cache hitting...');
    const isCached = false;
    if (isCached) {
      return of([]).pipe(tap(() => console.log('CacheInterceptor cache hit')));
    }
    return next.handle().pipe(
      tap(() => {
        console.log('CacheInterceptor after cache miss');
      }),
    );
  }
}
