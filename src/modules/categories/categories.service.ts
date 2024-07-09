import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/persistence/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllByUserId(userId: string) {
    const categories = await this.categoriesRepository.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        icon: true,
        type: true,
      },
    });

    return categories;
  }
}
