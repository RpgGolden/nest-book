import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { AuthorBook } from './models/author-book.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Author, AuthorBook]), // Импортируем модель Author для использования в сервисе и контроллере
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
