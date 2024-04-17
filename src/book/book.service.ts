import { Body, Injectable } from '@nestjs/common';
import { Book } from './models/book.model';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/author/models/author.model';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorBook } from 'src/author/models/author-book.model';
import { Op } from 'sequelize';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(Author)
    private authorModel: typeof Author,
    @InjectModel(AuthorBook)
    private authorBookModel: typeof AuthorBook,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.findAll({
      include: [
        {
          model: Author,
          through: { attributes: [] },
        },
      ],
    });
  }

  async createBookWithAuthors(createBookDto: CreateBookDto): Promise<Book> {
    const { name, description, title, price, authorIds } = createBookDto;

    // Создаем запись книги
    const book = await this.bookModel.create({
      name,
      description,
      title,
      price,
    });

    // Создаем записи в промежуточной таблице AuthorBook для связи книги с авторами
    await Promise.all(
      authorIds.map(async (authorId) => {
        await this.authorBookModel.create({
          bookId: book.id,
          authorId,
        });
      }),
    );

    return book;
  }

  async findByAuthor(@Body() authorName: string): Promise<Book[]> {
    return await this.bookModel.findAll({
      include: [
        {
          model: Author,
          where: {
            name: {
              [Op.iLike]: `%${authorName}%`, // Case-insensitive search for partial match
            },
          },
          through: { attributes: [] },
        },
      ],
    });
  }

  async findByBookName(@Body() bookName: string): Promise<Book[]> {
    return await this.bookModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${bookName}%`, // Case-insensitive search for partial match
        },
      },
      include: [
        {
          model: Author,
          through: { attributes: [] },
        },
      ],
    });
  }
}
