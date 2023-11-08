import { IsNotEmpty, IsNumber } from 'class-validator';

export class Cart_Item_Dto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
