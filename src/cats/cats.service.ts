import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  async findAll(): Promise<Cat[]> {
    // throw new Error('Test error');
    // throw new HttpException('Test error', HttpStatus.BAD_REQUEST);
    return Promise.resolve(this.cats);
  }
}
