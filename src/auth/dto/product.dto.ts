import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  discount?: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  sold?: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
