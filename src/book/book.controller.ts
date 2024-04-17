import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './models/book.model';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/getAllBooks')
  getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Get('/findByAuthor')
  async findByAuthor(@Body('authorName') authorName: string): Promise<any> {
    try {
      const books = await this.bookService.findByAuthor(authorName);
      return { success: true, data: books };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  @Get('/findByBookName')
  async findByBookName(@Body('bookName') bookName: string): Promise<any> {
    try {
      const books = await this.bookService.findByBookName(bookName);
      return { success: true, data: books };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('/createBook') async createBook(@Body() createBookDto: CreateBookDto) {
    try {
      const createdBook =
        await this.bookService.createBookWithAuthors(createBookDto);
      return { success: true, data: createdBook };
    } catch (error) {
      console.error('Ошибка при создании книги:', error);
      return {
        success: false,
        message: 'Произошла ошибка при создании книги.',
      };
    }
  }

  @Post('/updateBook/:bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updateBook = await this.bookService.updateBook(bookId, updateBookDto);

    return updateBook;
  }

  @Delete('/deleteBook/:bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    const book = await this.bookService.deleteBook(bookId);
    return 'Successfully deleted';
  }

  @Post('/addAuthor/:bookId')
  async addAuthor(
    @Param('bookId') bookId: string,
    @Body('authorIds') authorIds: string[],
  ) {
    const book = await this.bookService.addAuthorToBook(bookId, authorIds);

    return book;
  }
}
