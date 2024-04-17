import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post('/createAuthor')
  async createAuthor(@Body() body: { name: string; about: string }) {
    const { name, about } = body;
    return this.authorService.createAuthor(name, about);
  }

  @Get('/findAllAuthors')
  async findAll() {
    return this.authorService.findAll();
  }
}
