export class CreateUserOrderDto {
  readonly bookIds: string[]; // Массив идентификаторов книг
  readonly quantities: number[]; // Массив количества книг
}
