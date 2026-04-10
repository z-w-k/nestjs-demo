import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { type ConfigType } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    @Inject(databaseConfig.KEY)
    readonly dbConfig: ConfigType<typeof databaseConfig>,
  ) {
    const adapter = new PrismaPg(dbConfig.url);
    super({ adapter });
  }
}
