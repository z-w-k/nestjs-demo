import 'fastify';
import { User } from 'src/common/interfaces/user.interface';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
