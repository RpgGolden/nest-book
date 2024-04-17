// src/books/author-book.model.ts
import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Book } from './../../book/models/book.model';
import { Author } from './author.model';

@Table
export class AuthorBook extends Model<AuthorBook> {
  @ForeignKey(() => Book)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  bookId: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  authorId: string;
}
