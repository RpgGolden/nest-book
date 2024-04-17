import { Body, Injectable, Param } from '@nestjs/common';
import { Book } from './models/book.model';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/author/models/author.model';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorBook } from 'src/author/models/author-book.model';
import { Op } from 'sequelize';
import { UpdateBookDto } from './dto/update-book.dto';

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

  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const book = await this.bookModel.findByPk(bookId);
    if (!book) {
      throw new Error(`Book with id ${bookId} not found`);
    }
    const updateBook = await book.update(updateBookDto);
    return updateBook;
  }

  async deleteBook(@Param('bookId') bookId: string) {
    const book = await this.bookModel.findByPk(bookId);

    await book.destroy({ force: true });

    return 'Successfully deleted';
  }

  async addAuthorToBook(
    @Param('bookId') bookId: string,
    @Body() authorIds: string[],
  ): Promise<Book> {
    const book = await this.bookModel.findByPk(bookId);
    if (!book) {
      throw new Error(`Book with id ${bookId} not found`);
    }

    // Проверяем, есть ли уже связи между книгой и авторами
    const existingAuthorIds = (
      await book.$get('authors', { attributes: ['id'] })
    ).map((author) => author.id);

    // Избегаем дублирования связей
    const uniqueAuthorIds = authorIds.filter(
      (authorId) => !existingAuthorIds.includes(authorId),
    );

    // Создаем новые записи в промежуточной таблице AuthorBook для связи книги с новыми авторами
    await Promise.all(
      uniqueAuthorIds.map(async (authorId) => {
        await this.authorBookModel.create({
          bookId: book.id,
          authorId,
        });
      }),
    );

    return book;
  }
}
