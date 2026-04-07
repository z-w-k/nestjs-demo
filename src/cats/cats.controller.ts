import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDtoClass } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Role } from 'src/common/enums/role.enum';
import { Observable } from 'rxjs';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  // @Get('abcd/*')
  // @Get()
  // findAll(@Query('age') age: number, @Query('breed') breed: string): string {
  //   return `all cats filtered by age: ${age} and breed: ${breed}`;
  // }

  @Get()
  @Roles(Role.Admin)
  findAll() // @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
  // activeOnly: boolean,
  // @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  : Observable<Cat[]> {
    // console.log(activeOnly, page);
    // try {
    // return null;
    // return from(this.catsService.findAll()).pipe(delay(4000));
    // return from(this.catsService.findAll());
    // } catch (error) {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
    // throw new Error('Test error');
    // }
  }

  @Post()
  // @HttpCode(204)
  // @UseFilters(HttpExceptionFilter)
  // @Header('Cache-Control', 'no-store')
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  @Roles(Role.Admin)
  create(
    @Body()
    createCatDto: CreateCatDtoClass,
  ) {
    this.catsService.create(createCatDto);
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
