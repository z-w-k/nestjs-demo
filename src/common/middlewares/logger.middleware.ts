import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class logger implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    console.log('Request...' + req.url + req.method + Date.now());
    next();
    console.log('Request after next...');
  }
}

// export function logger(
//   req: FastifyRequest['raw'],
//   res: FastifyReply['raw'],
//   next: () => void,
// ) {
//   console.log(`Request...`);
//   next();
// }
