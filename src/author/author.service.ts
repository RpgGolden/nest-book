import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { Book } from 'src/book/models/book.model';

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
}
