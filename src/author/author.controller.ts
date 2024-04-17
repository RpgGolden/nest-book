import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/author-update.dto';

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

  @Post('/updateAuthor/:authorId')
  async updateAuthor(
    @Param('authorId') authorId: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    const updateAuthor = await this.authorService.updateAuthor(
      authorId,
      updateAuthorDto,
    );

    return updateAuthor;
  }

  @Delete('/deleteAuthor/:authorId')
  async deleteAuthor(@Param('authorId') authorId: string) {
    const author = await this.authorService.deleteAuthor(authorId);
    return 'Successfully deleted';
  }
}
