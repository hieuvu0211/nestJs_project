import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/auth/dto';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('hello')
  getHello() {
    return {
      msg: 'Hello',
    };
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
      discount?: number;
      quantity: number;
      sold?: number;
      status: string;
      image?: string;
      category_id: number;
    },
  ): Promise<Product> {
    const {
      name,
      price,
      description,
      discount,
      quantity,
      sold,
      status,
      image,
      category_id,
    } = productData;
    return await this.productService.createProduct({
      name,
      price,
      description,
      discount,
      quantity,
      sold,
      status,
      image,
      nameCategory: {
        connect: { id: category_id },
      },
    });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    dto: ProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<object> {
    return await this.productService.deleteProduct(Number(id));
  }
}
