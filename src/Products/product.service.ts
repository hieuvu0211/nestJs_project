import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
@Injectable({})
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany();
      if (products) {
        return products;
      }
    } catch (error) {
      throw new ForbiddenException('Product not found');
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id_Pro: Number(id) },
      });
      if (product) {
        const imagePath = path.join(__dirname, `../../uploads/product/${id}`);

      // Đọc danh sách các tệp ảnh trong thư mục
      const imageFiles = fs.readdirSync(imagePath);

      // Xây dựng đường dẫn đầy đủ đến từng ảnh và trả về chúng dưới dạng URL
      const imageUrls = imageFiles.map(
        (filename) =>
          `http://localhost:8080/product/getiamge/${id}/${filename}`,
      );
      let res = {
        ...product,
        imageFiles: imageUrls
      }
        return res;
      }
      return null;
    } catch (error) {
      throw new ForbiddenException('can not find product');
    }
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    console.log(data);
    try {
      const product = await this.prisma.product.create({data: data});
      const folderPath = `uploads/product/${product.id_Pro}`;
      fs.mkdirSync(folderPath);
      return product;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException("can't create product");
    }
  }

  async updateProduct(id: string, data: Product): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: { id_Pro: Number(id) },
        data: data,
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id: number): Promise<object> {
    try {
      await this.prisma.product.delete({ where: { id_Pro: id } });
      const uploadPath = `uploads/product/${id}`;
      await fsExtra.remove(uploadPath);
      return {
        msg: 'product deleted',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async SearchProduct(name: string){
    try {
      const res = await this.prisma.product.findMany({
        where: {
          name: {
            contains: name
          }
        }
      })
      if(res) {
        return res;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async CreateNewProduct(){
    return ({
      msg: "hello world"
    })
  }
}
