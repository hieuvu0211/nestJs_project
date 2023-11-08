import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { Cart_Item_Dto } from 'src/auth/dto';
import { CartItem } from '@prisma/client';

@Controller('cart-item')
export class CartItemController {
  constructor(private cart_item_service: CartItemService) {}

  @Get()
  getAll() {
    return this.cart_item_service.getAllcartItems();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.cart_item_service.getCartitemById(Number(id));
  }

  @Post()
  createCartItem(
    @Body()
    data: {
      cart_id: number;
      product_id: number;
      quantity: number;
      price: number;
    },
  ): Promise<Cart_Item_Dto> {
    const { cart_id, product_id, quantity, price } = data;
    return this.cart_item_service.createCartItem({
      cartName: { connect: { id: cart_id } },
      ProductName: { connect: { id: product_id } },
      quantity,
      price,
    });
  }

  @Patch(':id')
  updateCartItem(@Param('id') id: string, @Body() dto: Cart_Item_Dto) {
    return this.cart_item_service.updateCartItem(Number(id), dto);
  }

  @Delete(':id')
  deleteCartItem(@Param('id') id: string) {
    return this.cart_item_service.deleteCartItem(Number(id));
  }
}
