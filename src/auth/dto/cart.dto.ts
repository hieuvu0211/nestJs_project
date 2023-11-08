import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartDto {
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;
}
