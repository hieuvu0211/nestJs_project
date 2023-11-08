import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { Order_Product } from '@prisma/client';
import { OrderProductDto } from 'src/auth/dto';

@Controller('order-product')
export class OrderProductController {
  constructor(private opService: OrderProductService) {}

  @Get()
  getAll() {
    return this.opService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.opService.getById(Number(id));
  }

  @Post()
  createNew(
    @Body()
    data: {
      order_id: number;
      product_id: number;
      quantity?: number;
      price?: number;
    },
  ): Promise<Order_Product> {
    const { order_id, product_id, quantity, price } = data;
    return this.opService.create({
      quantity,
      price,
      order: { connect: { id: order_id } },
      product: { connect: { id: product_id } },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: OrderProductDto) {
    return this.opService.update({
      where: { id: Number(id) },
      data: {
        ...dto,
      },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.opService.delete(Number(id));
  }
}
