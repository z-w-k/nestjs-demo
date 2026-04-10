import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null-interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CacheInterceptor } from './common/interceptors/cache.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ConfigModule } from '@nestjs/config';
// import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import databaseConfig from './config/database.config';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExcludeNullInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
] as const;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.development.local', '.env'],
    }),
    CatsModule,
    PrismaModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ...interceptors,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
