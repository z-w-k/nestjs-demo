// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  url: string;
}

// 'database' 是这个配置的命名空间
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  url: process.env.DATABASE_URL as string,
}));
