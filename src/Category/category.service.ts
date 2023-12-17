import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Category, Product} from '@prisma/client'
@Injectable({})
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getCategory() {
    return await this.prismaService.category.findMany();
  }

  async getCategoryById(id: string) {
    const Id = Number(id);
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id_Cate: Id,
        },
      });
      if (category) {
        return category;
      }
    } catch (error) {
      throw new ForbiddenException('invalid category !');
    }
  }

  async createNewCategory(dto: Prisma.CategoryCreateInput) {
    console.log("dto cate = ", dto);
    try {
      const createCategory = await this.prismaService.category.create({
        data: dto,
      });
      return createCategory;
    } catch (error) {
      throw new ForbiddenException(
        'invalid create category! please try again!',
      );
    }
  }

  async updateCategory(param: {
    data: Prisma.CategoryUpdateInput;
    where: Prisma.CategoryWhereUniqueInput;
  }) {
    try {
      const { data, where } = param;
      const update = await this.prismaService.category.update({
        data,
        where,
      });
      return update;
    } catch (error) {
      throw new ForbiddenException('can not update category!');
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.prismaService.category.delete({
        where: {
          id_Cate: Number(id),
        },
      });
      return {
        msg: 'category deleted',
      };
    } catch (error) {
      throw new ForbiddenException('can not delete category!');
    }
  }
}
