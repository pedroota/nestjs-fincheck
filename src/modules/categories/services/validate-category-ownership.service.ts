import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/persistence/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string): Promise<boolean> {
    const isCategoryOwner = await this.categoriesRepository.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!isCategoryOwner) {
      return false;
    }

    return true;
  }
}
