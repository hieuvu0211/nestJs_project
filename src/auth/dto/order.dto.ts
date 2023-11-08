import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  staff_id: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  shipping_fee?: number;

  @IsNumber()
  total?: number;

  @IsNumber()
  @IsNotEmpty()
  coupon_id: number;

  canceled_at?: string;

  completed_at?: string;

  delivery_at?: string;
}
