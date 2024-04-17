import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { Book } from 'src/book/models/book.model';
import { UpdateAuthorDto } from './dto/author-update.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) {}

  async createAuthor(name: string, about: string): Promise<Author> {
    return await this.authorModel.create({
      name,
      about,
    });
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.findAll({
      include: [{ model: Book, through: { attributes: [] } }],
    });
  }

  async updateAuthor(
    @Param('authorId') authorId: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    const author = await this.authorModel.findByPk(authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    const updateAuthor = await author.update(updateAuthorDto);
    return updateAuthor;
  }

  async deleteAuthor(@Param('authorId') authorId: string) {
    const author = await this.authorModel.findByPk(authorId);

    await author.destroy({ force: true });
    return 'Successfully deleted';
  }
}
